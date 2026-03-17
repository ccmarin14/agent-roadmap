export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || '';
export const ALLOW_GUESTS = import.meta.env.VITE_ALLOW_GUESTS === 'true';
export const EXAMS_FOR_USERS = import.meta.env.VITE_EXAMS_FOR_USERS === 'true';
export const EXAMS_FOR_GUESTS = import.meta.env.VITE_EXAMS_FOR_GUESTS === 'true';
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);
