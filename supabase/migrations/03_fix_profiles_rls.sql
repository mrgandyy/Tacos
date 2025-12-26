-- Allow users to view their own profile even if not visible publicly
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );
