# Simulation SQL Lifecycle Ops v1.0.0

## Purpose

Provide one active operator runbook for the merged simulation SQL-planning stack.

## Lifecycle Stages

### Stage 1 — planning

Define table roles, keys, dependencies, and deferred references.

### Stage 2 — DDL ordering

Establish safe creation order and isolate circular reference risk.

### Stage 3 — draft pack

Author draft SQL units only under `infra/postgres/drafts/` or equivalent draft surfaces.

### Stage 4 — review and classification

Classify units as:

- `promotable_now`
- `promotable_after_minor_amend`
- `blocked_pending_owner_decision`
- `defer_future_phase`

### Stage 5 — owner-approved promotion only

Do not promote without explicit owner approval.

## Active Review Order

1. Unit A — base tables
2. Unit B — state cursor
3. Unit C — tick ledger
4. Unit D — snapshot materializations
5. Unit E — deferred foreign keys

## Review Questions

- Does it preserve additive-first behavior?
- Does it preserve dependency-safe order?
- Does it avoid touching existing business-domain tables?
- Does it preserve deterministic replay needs?
- Does it remain local-runtime compatible?
- Does it introduce unresolved retention, storage, or serialization decisions?

## Current Recommendation

- keep Unit A close to promotion after one bounded amendment pass
- keep Unit B as the cleanest live-candidate surface
- hold Unit C and Unit D pending explicit owner decisions
- keep Unit E deferred until the base path is stable

## Boundary Rule

Do not use this runbook to:

- mutate `infra/postgres/init/**`
- auto-apply draft SQL
- imply production readiness
- couple SQL lifecycle planning to AI-control roots
