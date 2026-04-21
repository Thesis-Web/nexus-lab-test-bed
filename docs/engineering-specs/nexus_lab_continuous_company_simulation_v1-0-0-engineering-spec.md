# Nexus Lab Continuous Company Simulation Engineering Spec v1.0.0

## 1. Authority

This spec implements:

- `docs/blueprints/nexus_lab_fake_company_topology_v1-0-0-canonical.md`
- `docs/blueprints/nexus_lab_continuous_company_simulation_v1-0-0-canonical.md`

If this spec conflicts with a controlling blueprint, the blueprint wins.

## 2. Build Objective

Add the canonical simulation layer without touching SQL, schema wiring, or runtime daemons.

This phase is intentionally limited to:

- docs
- simulation registries
- runbook notes
- open-gap logging

## 3. New Repo Roots Required

Add:

- `lab_data/simulation/`

No new roots are required in AI-control pack lanes.

## 4. Required Simulation Registries

Create these files:

- `lab_data/simulation/clock.registry.json`
- `lab_data/simulation/growth-stages.registry.json`
- `lab_data/simulation/event-generators.registry.json`
- `lab_data/simulation/control-modes.registry.json`
- `lab_data/simulation/facility-lifecycle.registry.json`
- `lab_data/simulation/workforce-lifecycle.registry.json`
- `lab_data/simulation/asset-expansion.registry.json`

## 5. Registry Content Requirements

### 5.1 Clock Registry

Must declare:

- simulation timezone
- business week profile
- business day profile
- tick profiles
- stage cadence multipliers

### 5.2 Growth Stages Registry

Must declare, per stage:

- stage id
- descriptive title
- headcount band
- facility profile
- communications volume profile
- procurement pressure profile
- governance pressure profile
- promotion trigger notes

### 5.3 Event Generators Registry

Must declare generator entries for:

- communications
- procurement
- finance
- workforce
- facilities
- customer
- vendor
- engineering
- governance pressure

Each entry must include:

- generator id
- family
- supported stages
- default cadence
- output targets
- deterministic notes

### 5.4 Control Modes Registry

Must declare:

- continuous
- paused
- snapshot
- reset
- rewind
- forked_timeline

### 5.5 Facility Lifecycle Registry

Must declare:

- facility classes
- open / expand / consolidate / retire transitions
- stage applicability
- associated asset classes

### 5.6 Workforce Lifecycle Registry

Must declare:

- employee lifecycle transitions
- entry channels
- exit channels
- role-change classes
- asset/access implications

### 5.7 Asset Expansion Registry

Must declare:

- asset classes
- request/approval/purchase/assign/maintain/retire/dispose chain
- stage applicability
- example triggers

## 6. Gap Log Requirement

Add:

- `docs/audits/phase-f-continuous-simulation-gap-log_v1-0-0.md`

The gap log must record newly surfaced but not yet built items, including:

- capex / fixed assets deeper accounting treatment
- property / lease detail
- workforce lifecycle data model
- regional expansion mechanics
- snapshot storage mechanics
- growth-stage SQL and validator wiring

## 7. Runbook Requirement

Add:

- `docs/runbooks/continuous-simulation-ops-v1-0-0.md`

It must explain:

- what endless-run mode means
- what pause/reset/rewind/fork mean
- why this is still deterministic
- which future implementation layers remain deferred

## 8. Explicit Deferrals

This phase must not touch:

- `infra/postgres/init/*.sql`
- `packages/contracts/domain/**`
- `packages/contracts/schemas/**`
- `scripts/validate/validate-manifests.mjs`
- any AI-control pack roots

## 9. Expected Next Phase

Phase F prepares the repo for later implementation phases that may add:

- simulation schemas
- SQL tables for snapshots and stage state
- generator manifests
- runner logic
- stage advancement runtime

Those later changes are not part of this build.
