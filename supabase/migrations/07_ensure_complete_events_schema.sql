-- Comprehensive fix to ensure ALL required columns exist on the 'events' table.
-- Run this to fix "Column not found" errors once and for all.

-- Basic Fields
ALTER TABLE events ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE events ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE events ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE events ADD COLUMN IF NOT EXISTS start_time timestamp with time zone;
ALTER TABLE events ADD COLUMN IF NOT EXISTS end_time timestamp with time zone;

-- Relationships (Hosts)
ALTER TABLE events ADD COLUMN IF NOT EXISTS host_profile_id uuid REFERENCES profiles(id) ON DELETE SET NULL;
ALTER TABLE events ADD COLUMN IF NOT EXISTS host_group_id uuid REFERENCES partnered_groups(id) ON DELETE SET NULL;

-- Metadata & Settings
ALTER TABLE events ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'UTC';
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_nsfw boolean DEFAULT false;
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_age_gated boolean DEFAULT false;
ALTER TABLE events ADD COLUMN IF NOT EXISTS instance_open_before_minutes integer DEFAULT 15;
ALTER TABLE events ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- JSON Structures
ALTER TABLE events ADD COLUMN IF NOT EXISTS slots jsonb DEFAULT '[]'::jsonb;
ALTER TABLE events ADD COLUMN IF NOT EXISTS co_hosts jsonb DEFAULT '[]'::jsonb;

-- Ensure RLS is enabled
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Reload Schema Cache (This is a comment for you: running any DDL like ALTER TABLE automatically clears Supabase API cache)
