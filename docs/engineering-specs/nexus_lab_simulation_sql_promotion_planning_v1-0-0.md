# Nexus Lab Simulation SQL Promotion Planning v1.0.0

## 1. Authority

This planning spec extends the prior simulation persistence, SQL, DDL, and draft-pack planning layers.

It defines the next bounded layer for promoting approved simulation SQL drafts into future live database-init or migration surfaces.

## 2. Intent

Phase M introduced the first concrete simulation SQL draft pack under `infra/postgres/drafts/`.

The next requirement is to pin:

- promotion review criteria
- promotion sequencing rules
- promotion blockers
- additive-first law for bringing drafts closer to live status

This phase still does not add live SQL under `infra/postgres/init/`.

## 3. Phase N Deliverables

Phase N adds:

- a promotion planning spec
- a promotion review runbook
- a phase gap log
- a promotion checklist manifest
- a bounded worker contract for promotion review assistance

## 4. Promotion Decision Categories

Each draft SQL file must be classified into one of these buckets:

- `promotable_now`
- `promotable_after_minor_amend`
- `blocked_pending_owner_decision`
- `defer_future_phase`

## 5. Promotion Review Criteria

A draft can only be promoted after review of:

- naming consistency
- dependency-safe order
- foreign-key timing
- nullability
- primary-key strategy
- index coverage
- additive-first behavior
- compatibility with existing business-domain tables
- compatibility with local-only runtime law

## 6. Promotion Units

Promotion should be reviewed as units:

### Unit A

- `010_simulation_timelines.sql`
- `020_simulation_checkpoints.sql`

### Unit B

- `030_simulation_state_cursors.sql`

### Unit C

- `040_simulation_tick_ledger.sql`

### Unit D

- `050_simulation_snapshot_materializations.sql`

### Unit E

- `060_add_simulation_timeline_checkpoint_fks.sql`

The FK-deferral unit is intentionally reviewed separately from base table creation.

## 7. Promotion Law

Future promotion must preserve these laws:

- draft SQL does not become live by accident
- promotion is explicit and owner-approved
- additive-first structure remains preferred
- no destructive changes in early phases
- AI-control roots remain untouched
- business-domain tables remain untouched unless separately approved

## 8. Expected Next Layer

A later approved phase may:

- classify each draft as promotable or blocked
- amend specific draft SQL files
- prepare live migration candidates
- add live SQL only after explicit owner approval
