-- Migration: Enable RLS on admins table
-- Created: 2026-05-27
-- Description: Secures public.admins exposed via PostgREST. Client roles cannot
-- read or modify admin membership; use SQL Editor or service_role to manage rows.
-- is_admin() (SECURITY DEFINER) continues to work for RLS policies on other tables.

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
