-- Create a table for public profiles using Supabase Auth
create table profiles (
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

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone if visible"
  on profiles for select
  using ( is_visible = true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Partnered Groups Table
create table partnered_groups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  owner_id uuid references profiles(id) on delete set null,
  description text,
  logo_url text,
  discord_link text,
  is_featured boolean default false,
  application_status text check (application_status in ('pending', 'approved', 'rejected')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table partnered_groups enable row level security;

create policy "Public groups are viewable by everyone"
  on partnered_groups for select
  using ( true );

create policy "Owners can update their own group"
  on partnered_groups for update
  using ( auth.uid() = owner_id );

-- Events Table
create table events (
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

alter table events enable row level security;

create policy "Events are viewable by everyone"
  on events for select
  using ( true );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'public');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
