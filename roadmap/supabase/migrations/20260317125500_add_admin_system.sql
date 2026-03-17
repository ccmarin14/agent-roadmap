-- Migration: Add admin system with profiles table
-- Created: 2026-03-17
-- Description: Creates admin system with is_admin() function and profiles table with user emails

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Create admins table
CREATE TABLE IF NOT EXISTS public.admins (
  user_id uuid references auth.users(id) on delete cascade primary key,
  created_at timestamptz default now()
);

-- 3. Create is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $inner$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid()
  );
END;
$inner$;

-- 4. Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. RLS policies for profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin() = true);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 6. Update user_progress policy to allow admin access
DROP POLICY IF EXISTS "Users see own progress" ON public.user_progress;
CREATE POLICY "Users see own progress" ON public.user_progress
  FOR ALL USING (auth.uid() = user_id OR user_id IS NULL OR public.is_admin() = true);

-- 7. Update quiz_results policy to allow admin access
DROP POLICY IF EXISTS "Users see own results" ON public.quiz_results;
CREATE POLICY "Users see own results" ON public.quiz_results
  FOR ALL USING (auth.uid() = user_id OR user_id IS NULL OR public.is_admin() = true);

-- 8. Update exam_results policy to allow admin access
DROP POLICY IF EXISTS "Users see own results exam" ON public.exam_results;
CREATE POLICY "Users see own results exam" ON public.exam_results
  FOR ALL USING (auth.uid() = user_id OR user_id IS NULL OR public.is_admin() = true);

-- 9. Migrate existing emails to profiles
INSERT INTO public.profiles (id, email)
SELECT id, email FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 10. Create trigger function to auto-create profile on new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $inner$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$inner$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 12. Insert initial admin user (execute manually after deployment for security)
-- INSERT INTO public.admins (user_id) VALUES ('61aa3086-22ac-4bb2-8ca4-9d101fc0f5de')
-- ON CONFLICT (user_id) DO NOTHING;
