# Nexus Lab Simulation SQL Promotion Classification v1.0.0

## 1. Authority

This phase extends the prior simulation SQL planning, DDL planning, draft-pack planning, and promotion-planning layers.

It classifies the existing draft SQL units for future promotion without moving any file into `infra/postgres/init/`.

## 2. Intent

Phase N defined the promotion process.
Phase O applies that process to the existing simulation SQL draft units and records a bounded classification outcome.

## 3. Deliverables

Phase O adds:

- a promotion-classification spec
- a live-candidate review runbook
- a Phase O gap log
- a promotion-decision manifest
- a bounded worker contract for SQL promotion classification

## 4. Classification Law

Each draft SQL unit must be classified into one of these buckets:

- `promotable_now`
- `promotable_after_minor_amend`
- `blocked_pending_owner_decision`
- `defer_future_phase`

The classification must be explicit, rationalized, and reversible.

## 5. Current Best-Solve Classification

### Unit A — base tables

Files:

- `010_simulation_timelines.sql`
- `020_simulation_checkpoints.sql`

Classification:

- `promotable_after_minor_amend`

Rationale:

- dependency order is sound
- checkpoint split is sound
- exact live-candidate wording for deferred checkpoint references still merits one more amendment pass

### Unit B — state cursor

Files:

- `030_simulation_state_cursors.sql`

Classification:

- `promotable_now`

Rationale:

- bounded table
- clear dependencies
- low ambiguity
- aligns well with existing planning layers

### Unit C — tick ledger

Files:

- `040_simulation_tick_ledger.sql`

Classification:

- `blocked_pending_owner_decision`

Rationale:

- ledger growth, retention, and optional partitioning remain unresolved enough to block live promotion

### Unit D — snapshot materialization

Files:

- `050_simulation_snapshot_materializations.sql`

Classification:

- `blocked_pending_owner_decision`

Rationale:

- final snapshot storage target and serialization approach remain unresolved

### Unit E — deferred timeline checkpoint foreign keys

Files:

- `060_add_simulation_timeline_checkpoint_fks.sql`

Classification:

- `defer_future_phase`

Rationale:

- this unit depends on final approval and wording of the earlier table promotions and is best kept deferred until base promotion is cleaner

## 6. Boundary Rules

Phase O must not:

- move draft SQL into `infra/postgres/init/`
- auto-apply any SQL
- mutate AI-control roots
- alter business-domain tables
- change live bring-up scripts

## 7. Expected Next Layer

A later approved phase may:

- amend Unit A for promotion readiness
- promote Unit B if owner approves
- defer or redesign Units C and D
- revisit Unit E after the base tables are finalized
