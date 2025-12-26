alter table profiles 
add column application_type text check (application_type in ('dj', 'partner', 'none')) default 'none';
