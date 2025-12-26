-- 1. Create Profiles Table (IF NOT EXISTS)
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  avatar_url text,
  bio text,
  role text check (role in ('public', 'applicant', 'dj', 'partner', 'admin')) default 'public',
  application_status text check (application_status in ('none', 'pending', 'approved', 'rejected')) default 'none',
  genres text[],
  socials jsonb,
  is_visible boolean default false,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

-- Policies for Profiles
drop policy if exists "Public profiles are viewable by everyone if visible" on profiles;
create policy "Public profiles are viewable by everyone if visible"
  on profiles for select
  using ( is_visible = true );

drop policy if exists "Users can insert their own profile" on profiles;
create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- FIX: Allow users to view their own profile regardless of visibility
drop policy if exists "Users can view own profile" on profiles;
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );


-- 2. Create Partnered Groups Table (IF NOT EXISTS)
create table if not exists partnered_groups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  owner_id uuid references profiles(id) on delete set null,
  description text,
  logo_url text,
  discord_link text,
  social_link text,  -- Added to match code usage
  is_featured boolean default false,
  application_status text check (application_status in ('pending', 'approved', 'rejected')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone
);

alter table partnered_groups enable row level security;

drop policy if exists "Public groups are viewable by everyone" on partnered_groups;
create policy "Public groups are viewable by everyone"
  on partnered_groups for select
  using ( true );

drop policy if exists "Owners can update their own group" on partnered_groups;
create policy "Owners can update their own group"
  on partnered_groups for update
  using ( auth.uid() = owner_id );
  
drop policy if exists "Authenticated users can create groups" on partnered_groups;
create policy "Authenticated users can create groups"
  on partnered_groups for insert
  with check ( auth.role() = 'authenticated' );


-- 3. Create Events Table (IF NOT EXISTS)
create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  host_profile_id uuid references profiles(id),
  host_group_id uuid references partnered_groups(id),
  image_url text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Apply updates to Events (Idempotent updates)
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'UTC',
ADD COLUMN IF NOT EXISTS is_nsfw boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_age_gated boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS instance_open_before_minutes integer DEFAULT 15,
ADD COLUMN IF NOT EXISTS announcement_url text,
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS slots jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS co_hosts jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL;

alter table events enable row level security;

drop policy if exists "Events are viewable by everyone" on events;
create policy "Events are viewable by everyone"
  on events for select
  using ( true );

-- Policy for admins/creators to update events would go here (omitted for MVP simplicity mostly relying on server actions)


-- 4. User Trigger Setup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'public')
  on conflict (id) do nothing; -- Prevent error if profile exists
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists to avoid duplication errors during recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
