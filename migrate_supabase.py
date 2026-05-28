#!/usr/bin/env python3
"""
============================================================================
Supabase to Local PostgreSQL Migration Script (v5 - Robust Types & Views)
============================================================================

PREREQUISITES:
-------------
1. Python Packages:
   pip3 install psycopg2-binary

2. PostgreSQL vector extension (Required for Supabase embeddings):
   sudo apt update
   sudo apt install postgresql-16-pgvector  # Change '16' to your PG version
   sudo systemctl restart postgresql

ENVIRONMENT VARIABLES (Optional):
--------------------------------
You can hardcode the URLs below, or use environment variables:
  export SOURCE_URL="postgresql://..."
  export DESTINATION_URL="postgresql://..."

FEATURES:
--------
- Auto-creates the destination database if it doesn't exist
- Auto-creates the public schema and vector extension
- Streams data directly (memory safe via temp files)
- Preserves exact typmods (like vector(1536) and varchar(255))
- Handles complex View dependencies with auto-retries
============================================================================
"""

import psycopg2
from psycopg2 import sql
from urllib.parse import urlparse
import sys
import os
import time
import tempfile

# ========================================
# CONFIGURATION - Update these URLs
# ========================================
SOURCE_URL = os.environ.get(
    "SOURCE_URL",
    "postgresql://postgres:YOUR_PASSWORD@db.YOUR-PROJECT.supabase.co:5432/postgres"
)
DESTINATION_URL = os.environ.get(
    "DESTINATION_URL",
    "postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/innate-backend"
)
# ========================================

SUPABASE_INTERNAL_SCHEMAS = {
    "auth", "storage", "realtime", "graphql", "graphql_public", "net",
    "pgsodium", "pgsodium_masks", "vault", "pgbouncer", "supabase_functions",
    "supabase_migrations", "information_schema", "pg_catalog", "pg_toast",
    "pg_temp_1", "pg_toast_temp_1", "_realtime", "_analytics", "cron",
}

SUPABASE_INTERNAL_TABLES = {
    "schema_migrations", "supabase_migrations", "supabase_functions",
}


def ensure_database_exists(dest_url):
    parsed = urlparse(dest_url)
    target_db = parsed.path.lstrip('/')
    default_db_url = dest_url.replace(f"/{target_db}", "/postgres")

    try:
        print("🛠️  Checking destination database...")
        conn = psycopg2.connect(default_db_url)
        conn.autocommit = True
        cur = conn.cursor()
        cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (target_db,))
        exists = cur.fetchone()

        if not exists:
            print(f"    ℹ️  Database '{target_db}' does not exist. Creating it...")
            cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(target_db)))
            print(f"    ✅ Database '{target_db}' created successfully.")
        else:
            print(f"    ✅ Database '{target_db}' already exists.")

        cur.close()
        conn.close()
        print()
    except Exception as e:
        print(f"  ❌ Failed to ensure database exists: {e}")
        sys.exit(1)


def connect(url, name):
    try:
        conn = psycopg2.connect(url)
        conn.autocommit = True
        print(f"  ✅ Connected to {name}")
        return conn
    except Exception as e:
        print(f"  ❌ Failed to connect to {name}: {e}")
        sys.exit(1)


def get_user_schemas(source_conn):
    cur = source_conn.cursor()
    cur.execute("""
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name NOT LIKE 'pg_%'
          AND schema_name != 'information_schema'
        ORDER BY schema_name;
    """)
    all_schemas = [row[0] for row in cur.fetchall()]
    cur.close()
    return [s for s in all_schemas if s not in SUPABASE_INTERNAL_SCHEMAS]


def get_enums(source_conn, schemas):
    cur = source_conn.cursor()
    placeholders = ",".join(["%s"] * len(schemas))
    cur.execute(f"""
        SELECT n.nspname AS schema_name,
               t.typname AS enum_name,
               array_agg(e.enumlabel ORDER BY e.enumsortorder) AS enum_values
        FROM pg_type t
        JOIN pg_enum e ON t.oid = e.enumtypid
        JOIN pg_namespace n ON t.typnamespace = n.oid
        WHERE n.nspname IN ({placeholders})
        GROUP BY n.nspname, t.typname
        ORDER BY n.nspname, t.typname;
    """, schemas)
    enums = cur.fetchall()
    cur.close()
    return enums


def create_enums(dest_conn, enums):
    cur = dest_conn.cursor()
    for schema_name, enum_name, enum_values in enums:
        values_str = ", ".join([f"'{v}'" for v in enum_values])
        try:
            cur.execute(f'DROP TYPE IF EXISTS "{schema_name}"."{enum_name}" CASCADE;')
            cur.execute(f'CREATE TYPE "{schema_name}"."{enum_name}" AS ENUM ({values_str});')
            print(f"    ✅ {schema_name}.{enum_name} ({len(enum_values)} values)")
        except Exception as e:
            print(f"    ⚠️  {schema_name}.{enum_name}: {e}")
    cur.close()


def get_tables(source_conn, schemas):
    cur = source_conn.cursor()
    placeholders = ",".join(["%s"] * len(schemas))
    cur.execute(f"""
        SELECT table_schema, table_name
        FROM information_schema.tables
        WHERE table_schema IN ({placeholders})
          AND table_type = 'BASE TABLE'
        ORDER BY table_schema, table_name;
    """, schemas)
    tables = [(row[0], row[1]) for row in cur.fetchall() if row[1] not in SUPABASE_INTERNAL_TABLES]
    cur.close()
    return tables


def get_columns(source_conn, schema_name, table_name):
    """Get column definitions for a table using pg_attribute for exact typmod preservation."""
    cur = source_conn.cursor()
    cur.execute("""
        SELECT
            a.attname AS column_name,
            format_type(a.atttypid, a.atttypmod) AS data_type,
            NOT a.attnotnull AS is_nullable,
            pg_get_expr(ad.adbin, ad.adrelid) AS column_default
        FROM pg_attribute a
        JOIN pg_class c ON a.attrelid = c.oid
        JOIN pg_namespace n ON c.relnamespace = n.oid
        LEFT JOIN pg_attrdef ad ON ad.adrelid = c.oid AND ad.adnum = a.attnum
        WHERE n.nspname = %s AND c.relname = %s
          AND a.attnum > 0 AND NOT a.attisdropped
        ORDER BY a.attnum;
    """, (schema_name, table_name))
    columns = cur.fetchall()
    cur.close()
    return columns


def get_primary_keys(source_conn, schema_name, table_name):
    cur = source_conn.cursor()
    cur.execute("""
        SELECT kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
            ON tc.constraint_name = kcu.constraint_name
            AND tc.table_schema = kcu.table_schema
        WHERE tc.table_schema = %s
          AND tc.table_name = %s
          AND tc.constraint_type = 'PRIMARY KEY'
        ORDER BY kcu.ordinal_position;
    """, (schema_name, table_name))
    pks = [row[0] for row in cur.fetchall()]
    cur.close()
    return pks


def get_unique_constraints(source_conn, schema_name, table_name):
    cur = source_conn.cursor()
    cur.execute("""
        SELECT tc.constraint_name, kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
            ON tc.constraint_name = kcu.constraint_name
            AND tc.table_schema = kcu.table_schema
        WHERE tc.table_schema = %s
          AND tc.table_name = %s
          AND tc.constraint_type = 'UNIQUE'
        ORDER BY tc.constraint_name, kcu.ordinal_position;
    """, (schema_name, table_name))
    rows = cur.fetchall()
    cur.close()
    
    constraints = {}
    for constraint_name, column_name in rows:
        constraints.setdefault(constraint_name, []).append(column_name)
    return list(constraints.items())


def get_foreign_keys(source_conn, schemas):
    cur = source_conn.cursor()
    placeholders = ",".join(["%s"] * len(schemas))
    cur.execute(f"""
        SELECT
            tc.table_schema,
            tc.table_name,
            tc.constraint_name,
            kcu.column_name,
            ccu.table_schema AS foreign_schema,
            ccu.table_name AS foreign_table_name,
            ccu.column_name AS foreign_column_name,
            rc.delete_rule,
            rc.update_rule
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
            ON tc.constraint_name = kcu.constraint_name
            AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage ccu
            ON ccu.constraint_name = tc.constraint_name
            AND ccu.table_schema = tc.table_schema
        JOIN information_schema.referential_constraints rc
            ON rc.constraint_name = tc.constraint_name
            AND rc.constraint_schema = tc.table_schema
        WHERE tc.table_schema IN ({placeholders})
          AND tc.constraint_type = 'FOREIGN KEY'
        ORDER BY tc.table_schema, tc.table_name;
    """, schemas)
    fks = cur.fetchall()
    cur.close()
    return fks


def get_indexes(source_conn, schemas):
    cur = source_conn.cursor()
    placeholders = ",".join(["%s"] * len(schemas))
    cur.execute(f"""
        SELECT schemaname, indexname, indexdef
        FROM pg_indexes
        WHERE schemaname IN ({placeholders})
          AND indexname NOT IN (
              SELECT constraint_name
              FROM information_schema.table_constraints
              WHERE table_schema IN ({placeholders})
                AND constraint_type IN ('PRIMARY KEY', 'UNIQUE')
          )
        ORDER BY schemaname, tablename, indexname;
    """, schemas + schemas)
    indexes = cur.fetchall()
    cur.close()
    return indexes


def build_create_table(schema_name, table_name, columns, primary_keys, unique_constraints):
    col_defs = []
    for col in columns:
        col_name, col_type, is_nullable, col_default = col
        parts = [f'"{col_name}"', col_type]

        if col_default and ("nextval(" in str(col_default)):
            if col_type.startswith('integer') or col_type.startswith('int'): parts[1] = 'SERIAL'
            elif col_type.startswith('bigint'): parts[1] = 'BIGSERIAL'
            elif col_type.startswith('smallint'): parts[1] = 'SMALLSERIAL'
        elif col_default is not None:
            parts.append(f"DEFAULT {col_default}")

        if not is_nullable:
            parts.append("NOT NULL")

        col_defs.append("  " + " ".join(parts))

    if primary_keys:
        pk_cols = ", ".join([f'"{pk}"' for pk in primary_keys])
        col_defs.append(f"  PRIMARY KEY ({pk_cols})")

    for constraint_name, constraint_cols in unique_constraints:
        unique_cols = ", ".join([f'"{c}"' for c in constraint_cols])
        col_defs.append(f"  UNIQUE ({unique_cols})")

    columns_sql = ",\n".join(col_defs)
    return f'CREATE TABLE IF NOT EXISTS "{schema_name}"."{table_name}" (\n{columns_sql}\n);'


def copy_table_data(source_conn, dest_conn, schema_name, table_name):
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        temp_path = temp_file.name

    try:
        with open(temp_path, 'wb') as f:
            source_cur = source_conn.cursor()
            source_cur.copy_expert(
                sql.SQL("COPY {}.{} TO STDOUT WITH (FORMAT csv, HEADER true, NULL '\\N')").format(
                    sql.Identifier(schema_name), sql.Identifier(table_name)
                ), f
            )
            source_cur.close()

        if os.path.getsize(temp_path) == 0:
            return 0

        with open(temp_path, 'rb') as f:
            num_rows = sum(1 for _ in f) - 1
            f.seek(0)
            dest_cur = dest_conn.cursor()
            try:
                dest_cur.copy_expert(
                    sql.SQL("COPY {}.{} FROM STDIN WITH (FORMAT csv, HEADER true, NULL '\\N')").format(
                        sql.Identifier(schema_name), sql.Identifier(table_name)
                    ), f
                )
                dest_conn.commit()
            except Exception as e:
                dest_conn.rollback()
                raise e
            finally:
                dest_cur.close()

        return max(0, num_rows)
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)


def get_sequences(source_conn, schemas):
    cur = source_conn.cursor()
    placeholders = ",".join(["%s"] * len(schemas))
    cur.execute(f"""
        SELECT sequence_schema, sequence_name
        FROM information_schema.sequences
        WHERE sequence_schema IN ({placeholders});
    """, schemas)
    sequences = []
    for (seq_schema, seq_name) in cur.fetchall():
        try:
            cur.execute(f'SELECT last_value FROM "{seq_schema}"."{seq_name}";')
            last_val = cur.fetchone()[0]
            sequences.append((seq_schema, seq_name, last_val))
        except Exception:
            pass
    cur.close()
    return sequences


def get_views(source_conn, schemas):
    cur = source_conn.cursor()
    placeholders = ",".join(["%s"] * len(schemas))
    cur.execute(f"""
        SELECT table_schema, table_name, view_definition
        FROM information_schema.views
        WHERE table_schema IN ({placeholders})
        ORDER BY table_schema, table_name;
    """, schemas)
    views = cur.fetchall()
    cur.close()
    return views


# ============================================================================
# MAIN EXECUTION
# ============================================================================
def main():
    start_time = time.time()

    print("=" * 65)
    print("  Supabase → Local PostgreSQL Migration (Auto-DB Version)")
    print("=" * 65)
    print()

    ensure_database_exists(DESTINATION_URL)

    print("🔌 Connecting to databases...")
    source_conn = connect(SOURCE_URL, "Supabase (Source)")
    dest_conn = connect(DESTINATION_URL, "Local (Destination)")
    dest_conn.autocommit = False
    print()

    print("📁 Step 1/7: Detecting non-Supabase schemas...")
    schemas = get_user_schemas(source_conn)
    if 'public' not in schemas:
        schemas.append('public')

    print(f"  ✅ Found {len(schemas)} schema(s):")
    for s in schemas:
        print(f"     • {s}")
    print()

    print("🏗️  Step 2/7: Creating schemas and extensions locally...")
    dest_conn.autocommit = True
    dest_cur = dest_conn.cursor()
    
    for schema in schemas:
        try:
            dest_cur.execute(f'CREATE SCHEMA IF NOT EXISTS "{schema}";')
            print(f"    ✅ schema: {schema}")
        except Exception as e:
            print(f"    ⚠️  {schema}: {e}")

    try:
        dest_cur.execute('CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;')
        print("    ✅ extension: vector")
    except Exception as e:
        print(f"    ⚠️  Failed to enable vector extension: {e}")
        print("       (Did you install 'postgresql-16-pgvector' on Ubuntu?)")
        
    dest_cur.close()
    dest_conn.autocommit = False
    print()

    print("📋 Step 3/7: Detecting and creating enum types...")
    enums = get_enums(source_conn, schemas)
    if enums:
        dest_conn.autocommit = True
        create_enums(dest_conn, enums)
        dest_conn.autocommit = False
        print(f"  ✅ {len(enums)} enum(s) created")
    else:
        print("  ℹ️  No custom enums found")
    print()

    print("🔍 Step 4/7: Detecting and creating tables...")
    tables = get_tables(source_conn, schemas)
    print(f"  Found {len(tables)} table(s) across all schemas.")
    
    created = 0
    skipped = 0
    for schema_name, table_name in tables:
        try:
            columns = get_columns(source_conn, schema_name, table_name)
            primary_keys = get_primary_keys(source_conn, schema_name, table_name)
            unique_constraints = get_unique_constraints(source_conn, schema_name, table_name)
            create_sql = build_create_table(schema_name, table_name, columns, primary_keys, unique_constraints)

            dest_conn.autocommit = True
            dest_cur = dest_conn.cursor()
            dest_cur.execute(f'DROP TABLE IF EXISTS "{schema_name}"."{table_name}" CASCADE;')
            dest_cur.execute(create_sql)
            dest_cur.close()
            dest_conn.autocommit = False

            print(f"    ✅ {schema_name}.{table_name} ({len(columns)} columns)")
            created += 1
        except Exception as e:
            print(f"    ⚠️  {schema_name}.{table_name}: {e}")
            skipped += 1
            try: dest_conn.rollback()
            except: pass
            dest_conn.autocommit = False

    print(f"  ✅ {created} table(s) created, {skipped} skipped")
    print()

    print("📦 Step 5/7: Copying data (using COPY streaming)...")
    total_rows = 0
    for schema_name, table_name in tables:
        try:
            num_rows = copy_table_data(source_conn, dest_conn, schema_name, table_name)
            total_rows += num_rows
            status = f"{num_rows:,} rows" if num_rows > 0 else "empty"
            print(f"    ✅ {schema_name}.{table_name}: {status}")
        except Exception as e:
            print(f"    ⚠️  {schema_name}.{table_name}: {e}")
            try: dest_conn.rollback()
            except: pass
    print(f"  ✅ Total: {total_rows:,} rows copied")
    print()

    print("🔗 Step 6/7: Adding foreign key constraints...")
    fks = get_foreign_keys(source_conn, schemas)
    fk_success = 0
    fk_failed = 0
    dest_conn.autocommit = True
    for fk in fks:
        fk_schema, table_name, constraint_name, column_name, foreign_schema, foreign_table, foreign_column, delete_rule, update_rule = fk
        try:
            dest_cur = dest_conn.cursor()
            on_delete = f"ON DELETE {delete_rule}" if delete_rule != "NO ACTION" else ""
            on_update = f"ON UPDATE {update_rule}" if update_rule != "NO ACTION" else ""
            alter_sql = f'''
                ALTER TABLE "{fk_schema}"."{table_name}"
                ADD CONSTRAINT "{constraint_name}"
                FOREIGN KEY ("{column_name}")
                REFERENCES "{foreign_schema}"."{foreign_table}" ("{foreign_column}")
                {on_delete} {on_update};
            '''
            dest_cur.execute(alter_sql)
            dest_cur.close()
            fk_success += 1
        except Exception as e:
            print(f"    ⚠️  {constraint_name}: {e}")
            fk_failed += 1

    print(f"  ✅ {fk_success} foreign key(s) added, {fk_failed} skipped")
    print()

    print("📇 Step 7/7: Adding indexes...")
    indexes = get_indexes(source_conn, schemas)
    idx_success = 0
    for schema_name, idx_name, idx_def in indexes:
        try:
            dest_cur = dest_conn.cursor()
            idx_sql = idx_def.replace("CREATE INDEX", "CREATE INDEX IF NOT EXISTS")
            idx_sql = idx_sql.replace("CREATE UNIQUE INDEX", "CREATE UNIQUE INDEX IF NOT EXISTS")
            dest_cur.execute(idx_sql)
            dest_cur.close()
            idx_success += 1
        except Exception as e:
            print(f"    ⚠️  {idx_name}: {e}")

    print(f"  ✅ {idx_success} index(es) added")
    print()

    print("🔢 Syncing sequences...")
    sequences = get_sequences(source_conn, schemas)
    dest_conn.autocommit = True
    seq_success = 0
    for seq_schema, seq_name, last_val in sequences:
        try:
            dest_cur = dest_conn.cursor()
            dest_cur.execute(f"""SELECT setval('"{seq_schema}"."{seq_name}"', {last_val}, true);""")
            dest_cur.close()
            seq_success += 1
        except Exception:
            pass
    print(f"  ✅ {seq_success} sequence(s) synced")
    print()

    print("👁️  Creating views (with retry loop for dependencies)...")
    views = get_views(source_conn, schemas)
    view_success = 0
    pending_views = list(views)
    max_retries = len(views) * 2  # Limit retries to prevent infinite loops
    
    while pending_views and max_retries > 0:
        view_schema, view_name, view_def = pending_views.pop(0)
        try:
            dest_cur = dest_conn.cursor()
            dest_cur.execute(f'CREATE OR REPLACE VIEW "{view_schema}"."{view_name}" AS {view_def}')
            dest_cur.close()
            view_success += 1
            print(f"    ✅ {view_schema}.{view_name}")
        except Exception as e:
            # If it's a pg_stat_statements missing function error, it's a Supabase system view we don't need
            if 'pg_stat_statements' in str(e):
                print(f"    ℹ️  Skipping Supabase internal view: {view_schema}.{view_name}")
            else:
                # Dependency likely missing, push back to end of queue
                pending_views.append((view_schema, view_name, view_def))
                max_retries -= 1

    if pending_views:
        print(f"    ⚠️  Failed to create {len(pending_views)} view(s) due to unresolvable dependencies.")
        for view_schema, view_name, _ in pending_views:
            print(f"       - {view_schema}.{view_name}")

    print(f"  ✅ {view_success} view(s) created")
    print()

    # ==============================
    # FINAL SUMMARY
    # ==============================
    elapsed = time.time() - start_time
    print("=" * 65)
    print(f"  ✅ Migration complete in {elapsed:.1f} seconds!")
    print(f"  📁 {len(schemas)} schemas")
    print(f"  📋 {len(enums)} enums")
    print(f"  📦 {created} tables | {total_rows:,} total rows")
    print(f"  🔗 {fk_success} foreign keys")
    print(f"  📇 {idx_success} indexes")
    print(f"  🔢 {seq_success} sequences")
    print(f"  👁️  {view_success} views")
    print("=" * 65)

    source_conn.close()
    dest_conn.close()


if __name__ == "__main__":
    main()
