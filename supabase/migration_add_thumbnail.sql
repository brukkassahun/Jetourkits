-- Migration: add separate thumbnail column to products
-- Run in Supabase SQL Editor

-- Add thumbnail column
alter table public.products add column if not exists thumbnail text;

-- Backfill existing rows: use first image as thumbnail
update public.products
set thumbnail = images[1]
where thumbnail is null and array_length(images, 1) > 0;

-- Update the updated_at trigger timestamp
update public.products set updated_at = now() where thumbnail is not null;
