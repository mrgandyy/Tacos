-- Admin Policies for Profiles

-- Allow admins to view ALL profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Allow admins to update ALL profiles
CREATE POLICY "Admins can update all profiles"
  ON profiles
  FOR UPDATE
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Allow admins to delete profiles
CREATE POLICY "Admins can delete all profiles"
  ON profiles
  FOR DELETE
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );


-- Admin Policies for Partnered Groups

-- Allow admins to view ALL groups (though public policy covers most, this ensures pending ones are seen)
CREATE POLICY "Admins can view all groups"
  ON partnered_groups
  FOR SELECT
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Allow admins to update ALL groups
CREATE POLICY "Admins can update all groups"
  ON partnered_groups
  FOR UPDATE
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
