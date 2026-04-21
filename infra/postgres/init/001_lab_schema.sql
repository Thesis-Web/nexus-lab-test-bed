CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS registry_bundle (
  bundle_pk UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_type TEXT NOT NULL CHECK (bundle_type IN ('actors', 'models', 'policies', 'scenario')),
  registry_id TEXT NOT NULL,
  version TEXT NOT NULL,
  source_path TEXT NOT NULL,
  sha256_hex TEXT NOT NULL,
  content JSONB NOT NULL,
  inserted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (bundle_type, registry_id, version)
);

CREATE TABLE IF NOT EXISTS run (
  run_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id TEXT NOT NULL,
  scenario_version TEXT NOT NULL,
  requested_by_actor_id TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'completed', 'failed', 'blocked')),
  decision_summary TEXT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::JSONB
);

CREATE TABLE IF NOT EXISTS run_event (
  event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL REFERENCES run(run_id) ON DELETE CASCADE,
  step_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (
    event_type IN (
      'registry_load',
      'classification',
      'routing',
      'governance_decision',
      'worker_dispatch',
      'assertion',
      'audit'
    )
  ),
  ordinal INTEGER NOT NULL CHECK (ordinal > 0),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  payload JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS decision_log (
  decision_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NULL REFERENCES run(run_id) ON DELETE SET NULL,
  actor_id TEXT NOT NULL,
  capability TEXT NOT NULL,
  model_id TEXT NULL,
  decision TEXT NOT NULL CHECK (decision IN ('allow', 'deny', 'require_approval')),
  reason TEXT NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'moderate', 'high', 'critical')),
  policy_id TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  context JSONB NOT NULL DEFAULT '{}'::JSONB
);

CREATE TABLE IF NOT EXISTS artifact_index (
  artifact_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logical_path TEXT NOT NULL,
  content_kind TEXT NOT NULL CHECK (content_kind IN ('doc', 'pdf', 'workbook', 'fixture', 'json', 'jsonl', 'text')),
  sha256_hex TEXT NOT NULL,
  size_bytes BIGINT NOT NULL CHECK (size_bytes >= 0),
  metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (logical_path, sha256_hex)
);

CREATE TABLE IF NOT EXISTS seed_history (
  seed_history_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manifest_id TEXT NOT NULL,
  manifest_version TEXT NOT NULL,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL CHECK (status IN ('started', 'completed', 'failed')),
  detail JSONB NOT NULL DEFAULT '{}'::JSONB
);

CREATE TABLE IF NOT EXISTS locations (
  location_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NULL,
  address_line1 TEXT NULL,
  address_line2 TEXT NULL,
  city TEXT NULL,
  state TEXT NULL,
  postal_code TEXT NULL,
  country TEXT NULL,
  latitude NUMERIC(10, 7) NULL,
  longitude NUMERIC(10, 7) NULL,
  location_type TEXT NOT NULL CHECK (location_type IN ('plant', 'warehouse', 'office', 'remote')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NULL,
  product_family TEXT NULL,
  unit_of_measure TEXT NOT NULL DEFAULT 'EA',
  default_location_id UUID NULL REFERENCES locations(location_id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  customer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  contact_name TEXT NULL,
  email TEXT NULL,
  phone TEXT NULL,
  billing_address_line1 TEXT NULL,
  billing_address_line2 TEXT NULL,
  billing_city TEXT NULL,
  billing_state TEXT NULL,
  billing_postal_code TEXT NULL,
  billing_country TEXT NULL,
  shipping_address_line1 TEXT NULL,
  shipping_address_line2 TEXT NULL,
  shipping_city TEXT NULL,
  shipping_state TEXT NULL,
  shipping_postal_code TEXT NULL,
  shipping_country TEXT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS research_briefs (
  research_brief_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NULL,
  body_markdown TEXT NULL,
  author_actor_code TEXT NULL,
  created_for_actor_code TEXT NULL,
  related_product_skus JSONB NOT NULL DEFAULT '[]'::JSONB,
  related_customer_account_codes JSONB NOT NULL DEFAULT '[]'::JSONB,
  status TEXT NOT NULL CHECK (status IN ('draft', 'in_review', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_registry_bundle_identity ON registry_bundle (bundle_type, registry_id, version);
CREATE INDEX IF NOT EXISTS idx_registry_bundle_content_gin ON registry_bundle USING GIN (content);
CREATE INDEX IF NOT EXISTS idx_run_status ON run (status);
CREATE INDEX IF NOT EXISTS idx_run_event_run_ordinal ON run_event (run_id, ordinal);
CREATE INDEX IF NOT EXISTS idx_decision_log_actor_capability ON decision_log (actor_id, capability);
CREATE INDEX IF NOT EXISTS idx_artifact_index_logical_path ON artifact_index (logical_path);
CREATE INDEX IF NOT EXISTS idx_locations_code ON locations (code);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products (sku);
CREATE INDEX IF NOT EXISTS idx_customers_account_code ON customers (account_code);
CREATE INDEX IF NOT EXISTS idx_research_briefs_code ON research_briefs (code);

CREATE OR REPLACE VIEW latest_registry_bundle AS
SELECT DISTINCT ON (bundle_type, registry_id)
  bundle_type,
  registry_id,
  version,
  source_path,
  sha256_hex,
  content,
  inserted_at
FROM registry_bundle
ORDER BY bundle_type, registry_id, inserted_at DESC;
