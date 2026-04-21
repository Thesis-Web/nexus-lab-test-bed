# Nexus Lab Data Bed Engineering Spec v1.0.1 Canonical

## 1. Authority

This spec implements `nexus_lab_data_bed_blueprint_v1-0-1-canonical.md`.

If the spec and blueprint conflict, the blueprint wins.

## 2. Required Repo Shape

- `docs/`
- `infra/`
- `apps/`
- `packages/`
- `lab_data/`
- `scripts/`
- `tests/`

## 3. Compose Law

Compose file path:

- `infra/compose/docker-compose.yml`

Required service:

- `postgres`

Optional service:

- `pgadmin`

Both services must use host-mounted state paths outside git, configured through `infra/env/lab.env`.

## 4. Env Law

Committed template:

- `infra/env/lab.env.example`

Uncommitted local file:

- `infra/env/lab.env`

Required variables:

- `LAB_POSTGRES_DB`
- `LAB_POSTGRES_USER`
- `LAB_POSTGRES_PASSWORD`
- `LAB_POSTGRES_PORT`
- `LAB_PGDATA_HOST_PATH`
- `LAB_PGADMIN_PORT`
- `LAB_PGADMIN_EMAIL`
- `LAB_PGADMIN_PASSWORD`
- `LAB_PGADMIN_HOST_PATH`
- `LAB_CORPUS_HOST_PATH`
- `LAB_EVIDENCE_HOST_PATH`
- `LAB_OLLAMA_BASE_URL`

## 5. Database Law

Bootstrap SQL path:

- `infra/postgres/init/001_lab_schema.sql`

The schema must create:

### Control Tables

- `registry_bundle`
- `run`
- `run_event`
- `decision_log`
- `artifact_index`
- `seed_history`

### Domain Tables

- `locations`
- `products`
- `customers`
- `research_briefs`

## 6. Contract Law

JSON schemas live in:

- `packages/contracts/schemas/`

Canonical worker contract JSON lives in:

- `packages/contracts/workers/`

## 7. Registry Law

Registry JSON files live in:

- `lab_data/registries/actors/actors.registry.json`
- `lab_data/registries/models/models.registry.json`
- `lab_data/registries/policies/policies.registry.json`

## 8. Seed Law

Seed manifests live in:

- `lab_data/seeds/manifests/registry.seed.manifest.json`
- `lab_data/seeds/manifests/domain.seed.manifest.json`

Domain seed JSON lives in:

- `lab_data/seeds/json/locations.json`
- `lab_data/seeds/json/products.json`
- `lab_data/seeds/json/customers.json`
- `lab_data/seeds/json/scenario_storylines.json`

## 9. Scenario Law

Scenario manifest path:

- `lab_data/scenarios/manifests/dell-like-governance-smoke.scenario.json`

The scenario must encode:

- registry load allowed
- analyst inference allowed
- analyst execution denied
- owner execution requires approval

## 10. Loader Law

Scripts:

- `scripts/seed/load-registry-bundles.mjs`
- `scripts/seed/load-domain-seeds.mjs`
- `scripts/seed/load-all.mjs`

Behavior:

- connect to local Postgres using env file
- upsert registry bundles into `registry_bundle`
- upsert domain seeds into domain tables
- record `seed_history`
- exit non-zero on failure

## 11. Local Script Law

Scripts:

- `scripts/local/init-host-paths.sh`
- `scripts/local/bring-up.sh`
- `scripts/local/down.sh`

Behavior:

- create host paths outside git
- create env file from template if absent
- bring up compose from repo root
- keep runtime deterministic

## 12. Validation Law

Validation script:

- `scripts/validate/validate-manifests.mjs`

It must validate:

- registries
- seed manifests
- scenario manifest
- worker contracts

## 13. Acceptance

The build is accepted when:

- `pnpm schema:validate` passes
- `bash scripts/local/bring-up.sh` starts the stack
- `pnpm seed:registries` succeeds
- `pnpm seed:domain` succeeds
- local state remains outside git
