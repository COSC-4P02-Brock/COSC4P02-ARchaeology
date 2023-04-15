import { createClient } from "@supabase/supabase-js";

export interface SupabaseContext {
  SUPABASE_KEY?: string;

  SUPABASE_URL?: string;
}

let supabaseClient: ReturnType<typeof createClient>;

export const supabase = ({ SUPABASE_KEY = '', SUPABASE_URL = ''}: SupabaseContext) => {
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
  }
  return supabaseClient;
}
