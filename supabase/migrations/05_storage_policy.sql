-- Create the storage bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('posters', 'posters', true)
on conflict (id) do nothing;

-- REMOVED: alter table storage.objects enable row level security;
-- RLS is already enabled on storage.objects by default, and your user might not have permission to toggle it.

-- Policy: Allow public read access to "posters" bucket
drop policy if exists "Public Access to Posters" on storage.objects;
create policy "Public Access to Posters"
  on storage.objects for select
  using ( bucket_id = 'posters' );

-- Policy: Allow authenticated users to upload to "posters" bucket
drop policy if exists "Auth Users can upload Posters" on storage.objects;
create policy "Auth Users can upload Posters"
  on storage.objects for insert
  with check ( bucket_id = 'posters' and auth.role() = 'authenticated' );

-- Policy: Allow users to update/delete their own uploads (optional, but good)
drop policy if exists "Users can update own posters" on storage.objects;
create policy "Users can update own posters"
  on storage.objects for update
  using ( bucket_id = 'posters' and auth.uid() = owner );

drop policy if exists "Users can delete own posters" on storage.objects;
create policy "Users can delete own posters"
  on storage.objects for delete
  using ( bucket_id = 'posters' and auth.uid() = owner );
