import { createClient } from "@supabase/supabase-js";

export interface SupabaseContext {
  SUPABASE_KEY?: string;

  SUPABASE_URL?: string;
}

export const supabase = ({ SUPABASE_KEY = '', SUPABASE_URL = ''}: SupabaseContext) =>
  createClient(SUPABASE_URL, SUPABASE_KEY);
