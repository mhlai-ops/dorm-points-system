-- 為現有晨樂加油站 students 表加入獨立 NFC Code／UID。
-- 此 migration 不會刪除或改寫現有 QR Code、姓名、積分或分數紀錄。
alter table public.students
  add column if not exists nfc_id text;

alter table public.students
  drop constraint if exists students_nfc_id_length;

alter table public.students
  add constraint students_nfc_id_length
  check (nfc_id is null or char_length(trim(nfc_id)) between 1 and 160);

create unique index if not exists students_nfc_id_unique_idx
  on public.students (nfc_id)
  where nfc_id is not null;
