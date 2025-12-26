-- Add new columns to events table
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'UTC',
ADD COLUMN IF NOT EXISTS is_nsfw boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_age_gated boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS instance_open_before_minutes integer DEFAULT 15,
ADD COLUMN IF NOT EXISTS announcement_url text,
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS slots jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS co_hosts jsonb DEFAULT '[]'::jsonb;

-- Add updated_at to events if not exists
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL;

-- Enable Storage for Event Posters
-- Note: User needs to create a bucket named 'posters' in Supabase Dashboard manually or via API if possible.
-- We can try to assume it exists or handle it in code, but typically buckets are created once.
-- We'll assume the user might need to create it, but we can try to set policies just in case.

-- Policy for anyone to view posters (if bucket exists)
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'posters' );
-- Policy for admins to upload (we'll handle auth check in app logic usually, or RLS)
