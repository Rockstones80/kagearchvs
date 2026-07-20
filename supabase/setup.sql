-- ════════════════════════════════════════════════════════════════════════
-- KAGEARCHVS — full database setup for a fresh Supabase project.
-- Run once: Supabase dashboard → SQL Editor → New query → paste → Run.
-- Safe to re-run (idempotent); re-running resets drop stock to the seed
-- numbers at the bottom.
-- ════════════════════════════════════════════════════════════════════════

-- ── 1. Orders ─────────────────────────────────────────────────────────────
create table if not exists orders (
  id                uuid primary key default gen_random_uuid(),
  order_number      text not null unique,
  payment_reference text not null,
  customer_email    text not null,
  customer_name     text not null,
  customer_phone    text default '',
  shipping_address  jsonb not null default '{}'::jsonb,
  items             jsonb not null default '[]'::jsonb,
  total_amount      numeric not null,
  currency          text not null default 'NGN',
  payment_status    text not null default 'completed',
  order_status      text not null default 'processing',
  paid_at           timestamptz,
  created_at        timestamptz not null default now()
);

alter table orders enable row level security;

-- The app uses the public anon key both to record orders (checkout) and to
-- list them (admin page), so both need anon policies.
drop policy if exists "anon can insert orders" on orders;
create policy "anon can insert orders"
  on orders for insert
  to anon, authenticated
  with check (true);

drop policy if exists "anon can read orders" on orders;
create policy "anon can read orders"
  on orders for select
  to anon, authenticated
  using (true);

-- ── 2. Per-size inventory for the July 16 drop ────────────────────────────
create table if not exists product_stock (
  product_slug text not null,
  size         text not null,
  stock        int  not null check (stock >= 0),
  updated_at   timestamptz not null default now(),
  primary key (product_slug, size)
);

alter table product_stock enable row level security;

drop policy if exists "public read stock" on product_stock;
create policy "public read stock"
  on product_stock for select
  to anon, authenticated
  using (true);

-- Atomically take p_qty units of a size. Returns true when stock was
-- available and taken, false when there wasn't enough — the WHERE guard
-- makes simultaneous checkouts safe (no overselling).
create or replace function decrement_stock(p_slug text, p_size text, p_qty int)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_qty <= 0 then
    return false;
  end if;

  update product_stock
     set stock = stock - p_qty,
         updated_at = now()
   where product_slug = p_slug
     and size = p_size
     and stock >= p_qty;

  return found;
end;
$$;

grant execute on function decrement_stock(text, text, int) to anon, authenticated;

-- ── 3. Initial stock for the drop ─────────────────────────────────────────
insert into product_stock (product_slug, size, stock) values
  ('kagearchvs-dreaming-tank-top', 'S', 4),
  ('kagearchvs-dreaming-tank-top', 'M', 3),
  ('kagearchvs-dreaming-tank-top', 'L', 1),
  ('kagearchvs-wordmark-tee',      'S', 3),
  ('kagearchvs-wordmark-tee',      'M', 7),
  ('kagearchvs-wordmark-tee',      'L', 5),
  ('kagearchvs-wordmark-tee',      'XL', 1)
on conflict (product_slug, size) do update set stock = excluded.stock;
