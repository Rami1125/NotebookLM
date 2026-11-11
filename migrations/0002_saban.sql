-- SABAN CREATIVE STUDIO — shared workspace tables.
-- Rows are company data. Access is gated by an authenticated member role,
-- resolved from the verified session user id (never a client-sent id).

create table if not exists members (
  user_id text primary key,
  name text not null default '',
  email text not null default '',
  role text not null default 'VIEWER',
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now()
);

create table if not exists products (
  product_id text primary key,
  sku text not null default '',
  name_he text not null,
  name_en text not null default '',
  manufacturer text not null default '',
  category text not null default '',
  package_size text not null default '',
  description text not null default '',
  marketing_benefits text not null default '',
  technical_data text not null default '',
  technical_status text not null default 'NEEDS_VERIFICATION',
  manufacturer_url text not null default '',
  technical_sheet_url text not null default '',
  product_image_url text not null default '',
  price_text text not null default '',
  price_approved boolean not null default false,
  promo_text text not null default '',
  complementary_ids text not null default '[]',
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists products_name_he_uidx on products (lower(name_he));
create unique index if not exists products_sku_uidx on products (lower(sku)) where sku <> '';

create table if not exists projects (
  project_id text primary key,
  project_name text not null,
  project_type text not null,
  product_ids text not null default '[]',
  target_audience text not null default '',
  visual_style text not null default '',
  format text not null default '',
  goal text not null default '',
  status text not null default 'DRAFT',
  preview_url text not null default '',
  export_url text not null default '',
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists slides (
  slide_id text primary key,
  project_id text not null,
  slide_number integer not null,
  title text not null default '',
  subtitle text not null default '',
  body text not null default '',
  technical_content text not null default '',
  image_url text not null default '',
  layout text not null default 'message',
  duration integer not null default 8,
  benefit text not null default '',
  cta text not null default '',
  warning text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists slides_project_idx on slides (project_id, slide_number);

create table if not exists video_projects (
  video_id text primary key,
  project_id text not null default '',
  title text not null,
  duration integer not null default 30,
  aspect_ratio text not null default '16:9',
  script text not null default '',
  storyboard text not null default '[]',
  video_prompt text not null default '',
  provider text not null default '',
  output_url text not null default '',
  status text not null default 'SCRIPT',
  versions text not null default '[]',
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists media_library (
  media_id text primary key,
  file_name text not null,
  media_type text not null default 'image',
  product_id text not null default '',
  source_type text not null default 'link',
  source_url text not null default '',
  storage_url text not null default '',
  license_status text not null default 'UNSPECIFIED',
  notes text not null default '',
  created_by text not null,
  created_at timestamptz not null default now()
);

create table if not exists prompt_library (
  prompt_id text primary key,
  prompt_name text not null,
  prompt_type text not null default 'text',
  prompt_text text not null,
  category text not null default '',
  variables text not null default '[]',
  builtin boolean not null default false,
  created_by text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists prompt_name_uidx on prompt_library (lower(prompt_name));

create table if not exists knowledge_sources (
  source_id text primary key,
  title text not null,
  source_type text not null default 'other',
  source_url text not null default '',
  product_id text not null default '',
  document_url text not null default '',
  verification_status text not null default 'NEEDS_VERIFICATION',
  last_verified text not null default '',
  notes text not null default '',
  excerpt text not null default '',
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists campaigns (
  campaign_id text primary key,
  campaign_name text not null,
  target_audience text not null default '',
  product_ids text not null default '[]',
  campaign_goal text not null default '',
  content_ids text not null default '[]',
  status text not null default 'DRAFT',
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists signage_screens (
  screen_id text primary key,
  name text not null,
  screen_type text not null default 'counter',
  product_ids text not null default '[]',
  interval_sec integer not null default 8,
  transition text not null default 'fade',
  status text not null default 'DRAFT',
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists system_logs (
  log_id text primary key,
  action text not null,
  user_id text not null default '',
  entity_type text not null default '',
  entity_id text not null default '',
  timestamp timestamptz not null default now(),
  result text not null default '',
  error_message text not null default ''
);

create index if not exists system_logs_time_idx on system_logs (timestamp desc);
