-- Add host_group_id if it doesn't exist
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS host_group_id uuid REFERENCES partnered_groups(id) ON DELETE SET NULL;

-- Add host_profile_id if it doesn't exist (good practice to have both options)
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS host_profile_id uuid REFERENCES profiles(id) ON DELETE SET NULL;
