import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY, isSupabaseConfigured } from '../config';

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

export const isSupabaseReady = isSupabaseConfigured;
