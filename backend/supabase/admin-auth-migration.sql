-- Run this by itself or after schema.sql.
-- This migration creates the profiles table and aligns existing installations.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text not null unique,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists name text;
alter table public.profiles add column if not exists role text;
alter table public.profiles add column if not exists created_at timestamptz;

update public.profiles
set created_at = now()
where created_at is null;

update public.profiles
set name = coalesce(name, ''),
    role = coalesce(role, 'user')
where name is null or role is null;

update public.profiles as profile
set email = auth_user.email
from auth.users as auth_user
where profile.id = auth_user.id
  and profile.email is distinct from auth_user.email;

alter table public.profiles alter column email set not null;
alter table public.profiles alter column role set default 'user';
alter table public.profiles alter column role set not null;
alter table public.profiles alter column created_at set default now();
alter table public.profiles alter column created_at set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_role_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_role_check check (role in ('user', 'admin'));
  end if;
end
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    'user'
  )
  on conflict (id) do update
    set email = excluded.email,
        name = coalesce(public.profiles.name, excluded.name);
  return new;
end;
$$;

create or replace function public.sync_profile_auth_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set email = new.email
  where id = new.id;
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
after update of email on auth.users
for each row execute function public.sync_profile_auth_fields();

drop policy if exists "Admins manage profiles" on public.profiles;
drop policy if exists "Users can view their profile" on public.profiles;
drop policy if exists "Users can update their profile" on public.profiles;

create policy "Admins manage profiles" on public.profiles
for all using (public.is_admin()) with check (public.is_admin());

create policy "Users can view their profile" on public.profiles
for select using (auth.uid() = id);

create policy "Users can update allowed profile fields" on public.profiles
for update using (auth.uid() = id)
with check (auth.uid() = id and role = 'user');

revoke update (email, role, id, created_at) on public.profiles from authenticated;

-- Create the first admin only after creating the user in Supabase Auth.
-- Replace the UUID and name, and verify the email matches auth.users.email.
--
-- insert into public.profiles (id, name, email, role)
-- select id, 'PitStop Admin', email, 'admin'
-- from auth.users
-- where id = 'AUTH_USER_UUID'
-- on conflict (id) do update
-- set name = excluded.name, email = excluded.email, role = 'admin';