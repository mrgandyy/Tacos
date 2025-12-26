-- 1. Add missing application_type column to profiles
alter table profiles 
add column if not exists application_type text check (application_type in ('dj', 'partner'));

-- 2. Fix the specific user's admin role (Run this if your email matches)
-- First, reset the auth.users role to 'authenticated' to fix the reported error
update auth.users 
set role = 'authenticated' 
where email = 'm.gandara10@gmail.com'; 

-- Second, properly promote the user profile to admin
update public.profiles 
set role = 'admin', application_status = 'approved' 
where id = (select id from auth.users where email = 'm.gandara10@gmail.com');
