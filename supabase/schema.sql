-- ============================================================
-- ScoreNexa Database Schema for Supabase
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique,
  full_name text,
  avatar_url text,
  is_premium boolean default false,
  is_admin boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone" on public.profiles
  for select using (true);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- CATEGORIES
-- ============================================================
create table if not exists public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  color text default '#2563eb',
  created_at timestamptz default now()
);

alter table public.categories enable row level security;
create policy "Categories viewable by everyone" on public.categories for select using (true);
create policy "Admins manage categories" on public.categories for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Seed default categories
insert into public.categories (name, slug, color, description) values
  ('News', 'news', '#2563eb', 'General football news'),
  ('Transfer News', 'transfer-news', '#7c3aed', 'Transfer rumours and confirmed deals'),
  ('Gossip', 'gossip', '#ea580c', 'Rumours, whispers and inside stories'),
  ('Match Report', 'match-report', '#16a34a', 'Post-match reports and analysis'),
  ('Opinion', 'opinion', '#475569', 'Expert opinion and analysis')
on conflict (slug) do nothing;

-- ============================================================
-- ARTICLES
-- ============================================================
create table if not exists public.articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  category_id uuid references public.categories(id),
  category_name text,
  featured_image text,
  author_id uuid references public.profiles(id),
  author_name text,
  published_at timestamptz,
  updated_at timestamptz default now(),
  seo_title text,
  seo_description text,
  is_breaking boolean default false,
  status text default 'draft' check (status in ('draft', 'published', 'scheduled', 'archived')),
  article_type text default 'news' check (article_type in ('news', 'gossip', 'transfer', 'match-report', 'opinion')),
  tags text[] default '{}',
  views integer default 0,
  created_at timestamptz default now()
);

alter table public.articles enable row level security;

create policy "Published articles viewable by everyone" on public.articles
  for select using (status = 'published');
create policy "Admins can do everything with articles" on public.articles
  for all using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Full-text search index
create index if not exists articles_search_idx on public.articles
  using gin(to_tsvector('english', coalesce(title,'') || ' ' || coalesce(excerpt,'') || ' ' || coalesce(content,'')));

create index if not exists articles_status_published_idx on public.articles(status, published_at desc);
create index if not exists articles_slug_idx on public.articles(slug);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger articles_updated_at before update on public.articles
  for each row execute function update_updated_at();

-- ============================================================
-- TEAMS
-- ============================================================
create table if not exists public.teams (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  logo_url text,
  country text,
  league_id uuid,
  founded integer,
  stadium text,
  description text,
  api_id integer unique,
  created_at timestamptz default now()
);

alter table public.teams enable row level security;
create policy "Teams viewable by everyone" on public.teams for select using (true);
create policy "Admins manage teams" on public.teams for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- ============================================================
-- LEAGUES
-- ============================================================
create table if not exists public.leagues (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  country text,
  logo_url text,
  season integer default 2024,
  api_id integer unique,
  description text,
  created_at timestamptz default now()
);

alter table public.leagues enable row level security;
create policy "Leagues viewable by everyone" on public.leagues for select using (true);
create policy "Admins manage leagues" on public.leagues for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Seed top leagues
insert into public.leagues (name, slug, country, season, api_id) values
  ('Premier League', 'premier-league', 'England', 2024, 39),
  ('La Liga', 'la-liga', 'Spain', 2024, 140),
  ('Bundesliga', 'bundesliga', 'Germany', 2024, 78),
  ('Serie A', 'serie-a', 'Italy', 2024, 135),
  ('Ligue 1', 'ligue-1', 'France', 2024, 61),
  ('Champions League', 'champions-league', 'Europe', 2024, 2),
  ('Europa League', 'europa-league', 'Europe', 2024, 3),
  ('MLS', 'mls', 'USA', 2024, 253)
on conflict (slug) do nothing;

-- ============================================================
-- MATCHES
-- ============================================================
create table if not exists public.matches (
  id uuid default uuid_generate_v4() primary key,
  provider text not null default 'api-football',
  provider_match_id text not null,
  league_id uuid references public.leagues(id),
  home_team_id uuid references public.teams(id),
  away_team_id uuid references public.teams(id),
  kickoff_time timestamptz not null,
  status text not null default 'NS',
  home_score integer,
  away_score integer,
  minute integer,
  home_team_name text not null,
  away_team_name text not null,
  league_name text not null,
  home_team_logo text,
  away_team_logo text,
  venue text,
  created_at timestamptz default now(),
  unique(provider, provider_match_id)
);

alter table public.matches enable row level security;
create policy "Matches viewable by everyone" on public.matches for select using (true);
create policy "Admins manage matches" on public.matches for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

create index if not exists matches_kickoff_idx on public.matches(kickoff_time desc);
create index if not exists matches_status_idx on public.matches(status);

-- ============================================================
-- AD SLOTS
-- ============================================================
create table if not exists public.ad_slots (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  position text not null,
  code text,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table public.ad_slots enable row level security;
create policy "Active ad slots viewable by everyone" on public.ad_slots
  for select using (is_active = true);
create policy "Admins manage ad slots" on public.ad_slots for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Seed default ad slots
insert into public.ad_slots (name, position, is_active) values
  ('Homepage Banner', 'banner', true),
  ('Article Sidebar', 'sidebar', true),
  ('In-Article Mid', 'in-article', true),
  ('Mobile Footer Sticky', 'mobile-footer', true);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================================
create table if not exists public.newsletter_subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table public.newsletter_subscribers enable row level security;
create policy "Admins view subscribers" on public.newsletter_subscribers for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));
-- Allow anyone to insert (subscribe)
create policy "Anyone can subscribe" on public.newsletter_subscribers
  for insert with check (true);

-- ============================================================
-- SUBSCRIPTIONS (Premium)
-- ============================================================
create table if not exists public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  plan text not null check (plan in ('monthly', 'annual')),
  status text not null check (status in ('active', 'cancelled', 'expired')),
  started_at timestamptz default now(),
  expires_at timestamptz,
  stripe_subscription_id text unique,
  created_at timestamptz default now()
);

alter table public.subscriptions enable row level security;
create policy "Users view own subscriptions" on public.subscriptions
  for select using (auth.uid() = user_id);
create policy "Admins view all subscriptions" on public.subscriptions for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- ============================================================
-- USEFUL VIEWS
-- ============================================================

-- Published articles with category info
create or replace view public.published_articles as
  select a.*, c.name as computed_category_name, c.color as category_color
  from public.articles a
  left join public.categories c on a.category_id = c.id
  where a.status = 'published'
  order by a.published_at desc;

-- ============================================================
-- STORAGE BUCKET (for images)
-- ============================================================
-- Run in Supabase dashboard or via CLI:
-- insert into storage.buckets (id, name, public) values ('media', 'media', true);
-- create policy "Anyone can view media" on storage.objects for select using (bucket_id = 'media');
-- create policy "Admins can upload media" on storage.objects for insert
--   with check (bucket_id = 'media' and auth.role() = 'authenticated');

-- ============================================================
-- MAKE YOURSELF ADMIN (run after first signup)
-- Replace 'your-email@example.com' with your actual email
-- ============================================================
-- update public.profiles set is_admin = true
-- where id = (select id from auth.users where email = 'your-email@example.com');
