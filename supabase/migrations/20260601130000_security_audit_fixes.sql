-- Migration: Security audit fixes
-- 1. Allow all authenticated users to read all profiles (needed for family list views)
-- 2. Revoke overly broad grants on handle_new_user trigger function

-- ============================================================
-- Fix 1: perfiles — allow SELECT for all authenticated users
-- ============================================================
-- The family wishlist and potluck views join perfiles(nombre) across
-- all family members. The previous policy ("Usuarios pueden ver su
-- propio perfil") only allowed users to see their own name, causing
-- other members' names to appear as null in nested joins.

CREATE POLICY "Todos los usuarios pueden ver todos los perfiles"
  ON public.perfiles FOR SELECT TO authenticated
  USING (true);

-- ============================================================
-- Fix 2: handle_new_user — tighten function grants
-- ============================================================
-- The trigger function was granted ALL to anon and authenticated.
-- Since it is SECURITY DEFINER (runs as postgres), any authenticated
-- user could call it directly to insert arbitrary rows into perfiles
-- and wishlist. The trigger itself does not need these grants — it
-- executes with the function owner's privileges regardless.

REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM authenticated;
