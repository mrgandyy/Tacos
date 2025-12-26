-- 1. Drop the problematic recursive policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can delete all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can view all groups" ON partnered_groups;
DROP POLICY IF EXISTS "Admins can update all groups" ON partnered_groups;

-- 2. Create helper function to check admin status securely
-- SECURITY DEFINER allows this function to bypass RLS when evaluating the user's role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Re-create policies using the secure function
-- Profiles Policies
CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  USING ( is_admin() );

CREATE POLICY "Admins can update all profiles"
  ON profiles
  FOR UPDATE
  USING ( is_admin() );

CREATE POLICY "Admins can delete all profiles"
  ON profiles
  FOR DELETE
  USING ( is_admin() );

-- Partnered Groups Policies
CREATE POLICY "Admins can view all groups"
  ON partnered_groups
  FOR SELECT
  USING ( is_admin() );

CREATE POLICY "Admins can update all groups"
  ON partnered_groups
  FOR UPDATE
  USING ( is_admin() );
