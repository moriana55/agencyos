-- ============================================================
-- AgencyOS — Neon DB Şeması (Sprint 1-3)
-- Neon Console > SQL Editor > Yapıştır > Run
-- ============================================================

-- 1. Ajanslar
CREATE TABLE agencies (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  clerk_id   TEXT UNIQUE NOT NULL,   -- Clerk user ID (owner)
  name       TEXT NOT NULL,
  plan       TEXT NOT NULL DEFAULT 'starter',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Müşteriler
CREATE TABLE clients (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  agency_id  TEXT NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  industry   TEXT,
  logo_url   TEXT,
  status     TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Sosyal medya hesapları
CREATE TABLE social_accounts (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  client_id         TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  platform          TEXT NOT NULL,   -- instagram | tiktok | facebook | twitter | linkedin
  platform_username TEXT,
  ayrshare_profile  TEXT,            -- Ayrshare profile key (her müşteri için)
  connected_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. İçerik takvimi
CREATE TABLE content_posts (
  id             TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  client_id      TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  agency_id      TEXT NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  title          TEXT NOT NULL,
  caption        TEXT,
  media_urls     TEXT[],             -- görsel/video URL'leri
  platforms      TEXT[],             -- ['instagram', 'facebook', ...]
  scheduled_at   TIMESTAMPTZ,
  published_at   TIMESTAMPTZ,
  status         TEXT NOT NULL DEFAULT 'draft', -- draft | scheduled | published | failed
  ayrshare_post_id TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- İndeksler
CREATE INDEX idx_clients_agency      ON clients(agency_id);
CREATE INDEX idx_posts_client        ON content_posts(client_id);
CREATE INDEX idx_posts_scheduled     ON content_posts(scheduled_at);
CREATE INDEX idx_social_client       ON social_accounts(client_id);
