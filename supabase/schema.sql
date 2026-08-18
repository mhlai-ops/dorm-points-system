-- 晨樂加油站 Supabase schema
-- 安全預設：只允許 Supabase Auth 已登入使用者操作資料。
-- 不要把 service_role key 放入前端或 GitHub。

create extension if not exists pgcrypto;

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  qr_id text not null unique,
  nfc_id text check (nfc_id is null or char_length(trim(nfc_id)) between 1 and 160),
  name text not null check (char_length(trim(name)) between 1 and 80),
  points integer not null default 0 check (points >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.point_logs (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  item text not null check (char_length(trim(item)) between 1 and 120),
  delta integer not null check (delta <> 0),
  balance integer not null check (balance >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists point_logs_student_created_idx
  on public.point_logs (student_id, created_at desc);

create index if not exists students_qr_id_idx
  on public.students (qr_id);

create unique index if not exists students_nfc_id_unique_idx
  on public.students (nfc_id)
  where nfc_id is not null;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists students_set_updated_at on public.students;
create trigger students_set_updated_at
before update on public.students
for each row execute function public.set_updated_at();

drop trigger if exists point_logs_set_updated_at on public.point_logs;
create trigger point_logs_set_updated_at
before update on public.point_logs
for each row execute function public.set_updated_at();

alter table public.students enable row level security;
alter table public.point_logs enable row level security;

drop policy if exists "authenticated users can read students" on public.students;
create policy "authenticated users can read students"
on public.students for select
to authenticated using (true);

drop policy if exists "authenticated users can insert students" on public.students;
create policy "authenticated users can insert students"
on public.students for insert
to authenticated with check (true);

drop policy if exists "authenticated users can update students" on public.students;
create policy "authenticated users can update students"
on public.students for update
to authenticated using (true) with check (points >= 0);

drop policy if exists "authenticated users can delete students" on public.students;
create policy "authenticated users can delete students"
on public.students for delete
to authenticated using (true);

drop policy if exists "authenticated users can read point logs" on public.point_logs;
create policy "authenticated users can read point logs"
on public.point_logs for select
to authenticated using (true);

drop policy if exists "authenticated users can insert point logs" on public.point_logs;
create policy "authenticated users can insert point logs"
on public.point_logs for insert
to authenticated with check (delta <> 0 and balance >= 0);

drop policy if exists "authenticated users can update point logs" on public.point_logs;
create policy "authenticated users can update point logs"
on public.point_logs for update
to authenticated using (true) with check (delta <> 0 and balance >= 0);

drop policy if exists "authenticated users can delete point logs" on public.point_logs;
create policy "authenticated users can delete point logs"
on public.point_logs for delete
to authenticated using (true);

-- 啟用 Supabase Realtime。重複執行時先移除再加入，避免 duplicate_object。
do $$
begin
  alter publication supabase_realtime drop table public.students;
exception when undefined_object then null;
          when undefined_table then null;
end $$;

do $$
begin
  alter publication supabase_realtime drop table public.point_logs;
exception when undefined_object then null;
          when undefined_table then null;
end $$;

alter publication supabase_realtime add table public.students;
alter publication supabase_realtime add table public.point_logs;

-- 預載兩位宿生；若 qr_id 已存在則不重複插入。
insert into public.students (qr_id, name, points)
values
  ('20418', '思𤦭', 0),
  ('20409', '楚榆', 0)
on conflict (qr_id) do nothing;
