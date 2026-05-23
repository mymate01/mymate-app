import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { supabase } from './supabaseClient';
import { CareerNode } from '../types/career';

// Ensure env variables are loaded
dotenv.config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;

async function runSchemaMigration() {
  if (!databaseUrl) {
    console.error('Error: DATABASE_URL is not set in .env.local');
    process.exit(1);
  }

  console.log('Connecting to PostgreSQL database for schema setup...');
  const client = new Client({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected successfully. Reading supabase/schema.sql...');

    const schemaPath = path.join(process.cwd(), 'supabase', 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found at: ${schemaPath}`);
    }

    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Simple statement splitter by semicolon
    const statements = schemaSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log(`Executing ${statements.length} schema statements...`);

    for (let statement of statements) {
      const sqlQuery = statement + ';';
      
      try {
        await client.query(sqlQuery);
      } catch (error: any) {
        const errorMsg = error.message || '';
        if (
          errorMsg.includes('already exists') || 
          errorMsg.includes('already installed')
        ) {
          // Soft warning for existing objects
          console.log(`[Already Exists/Skipped]: ${sqlQuery.split('\n')[0]}...`);
        } else {
          console.error(`Database Error during execution of:\n${sqlQuery}`);
          throw error;
        }
      }
    }

    console.log('Schema migration complete or verified.');

    // Refresh PostgREST schema cache so REST API knows about the new tables instantly
    console.log('Refreshing Supabase REST API schema cache...');
    await client.query("NOTIFY pgrst, 'reload schema';");
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Schema cache refreshed successfully.');
  } catch (error) {
    console.error('Failed to run schema migration:', error);
    throw error;
  } finally {
    await client.end();
  }
}

async function migrateData() {
  try {
    // 1. Run DB Schema setup (DDL) via Direct Postgres
    await runSchemaMigration();

    console.log('\nReading seed JSON files...');
    const seedCareerNodesPath = path.join(process.cwd(), 'supabase', 'seed_career_nodes.json');
    const seedJobRolesPath = path.join(process.cwd(), 'supabase', 'seed_job_roles.json');

    if (!fs.existsSync(seedCareerNodesPath) || !fs.existsSync(seedJobRolesPath)) {
      throw new Error('Seed JSON files not found. Run the seed generation first.');
    }

    const post10thCareerMap: CareerNode = JSON.parse(fs.readFileSync(seedCareerNodesPath, 'utf8'));
    const jobRoleDetails: Record<string, any> = JSON.parse(fs.readFileSync(seedJobRolesPath, 'utf8'));

    console.log('Starting DML data migration to Supabase...');

    // 2. Migrate Job Roles
    console.log('\n--- Migrating Job Roles ---');
    const jobRolesToInsert = Object.entries(jobRoleDetails).map(([roleName, details]: [string, any]) => ({
      role_name: roleName,
      description: details.description,
      avg_salary: details.avgSalary,
      skills: details.skills,
      work_environment: details.workEnvironment,
      growth_outlook: details.growthOutlook,
      icon: details.icon
    }));

    if (jobRolesToInsert.length > 0) {
      const { data: jobData, error: jobError } = await supabase
        .from('job_roles')
        .upsert(jobRolesToInsert, { onConflict: 'role_name' });

      if (jobError) {
        console.error('Error inserting job roles:', jobError);
        return;
      }
      console.log(`Successfully migrated ${jobRolesToInsert.length} job roles.`);
    }

    // 3. Flatten and Migrate Career Nodes
    console.log('\n--- Migrating Career Nodes ---');
    const nodesToInsert: any[] = [];

    function flattenNode(node: CareerNode, parentId: string | null = null) {
      nodesToInsert.push({
        id: node.id,
        parent_id: parentId,
        label: node.label,
        description: node.description || null,
        details: node.details || null
      });

      if (node.children && node.children.length > 0) {
        node.children.forEach(child => flattenNode(child, node.id));
      }
    }

    flattenNode(post10thCareerMap);

    if (nodesToInsert.length > 0) {
      const { data: nodeData, error: nodeError } = await supabase
        .from('career_nodes')
        .upsert(nodesToInsert, { onConflict: 'id' });

      if (nodeError) {
        console.error('Error inserting career nodes:', nodeError);
        return;
      }
      console.log(`Successfully migrated ${nodesToInsert.length} career nodes.`);
    }

    console.log('\nAll migration steps successfully completed!');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrateData();
