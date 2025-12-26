-- Enable RLS just in case
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert events
-- (In a real app, you might restrict this to 'admin' or 'partner' roles, but for now 'authenticated' is fine)
DROP POLICY IF EXISTS "Authenticated users can create events" ON events;
CREATE POLICY "Authenticated users can create events"
  ON events FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' );

-- Allow users to update their own events (if they are the host host_profile_id)
DROP POLICY IF EXISTS "Hosts can update their own events" ON events;
CREATE POLICY "Hosts can update their own events"
  ON events FOR UPDATE
  USING ( auth.uid() = host_profile_id );
  
-- Allow admins to update anything (optional, but useful)
-- Requires a way to check for admin role in the policy, usually via a helper function or direct claim check.
-- For MVP, the above insert policy solves the immediate blocker.
