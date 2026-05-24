import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create the client only if both values are present (avoids crash in CI builds)
let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true
    }
  });
} else {
  // Provide a dummy client that returns empty results during CI/build
  console.warn('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase client is unavailable.');
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      upsert: () => Promise.resolve({ data: [], error: null }),
    }),
  } as unknown as SupabaseClient;
}

export { supabase };
