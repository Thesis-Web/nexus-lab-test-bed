# Simulation SQL Draft Apply Order v1.0.0

## Purpose

This runbook explains the intended review and future apply order for the first-draft simulation persistence SQL pack.

## Draft-Only Status

These SQL files are drafts only.
They are not currently part of live lab bring-up.

## Recommended Review / Future Apply Order

1. `010_simulation_timelines.sql`
2. `020_simulation_checkpoints.sql`
3. `030_simulation_state_cursors.sql`
4. `040_simulation_tick_ledger.sql`
5. `050_simulation_snapshot_materializations.sql`
6. `060_add_simulation_timeline_checkpoint_fks.sql`

## Why the split matters

`simulation_timelines` contains two checkpoint reference columns:

- `source_checkpoint_id`
- `head_checkpoint_id`

Those foreign keys are deferred to the final draft file so that timelines can be created before checkpoints and then back-linked safely.

## Review checklist

Before any future promotion to live SQL, review:

- primary keys
- unique constraints
- nullable vs non-nullable columns
- foreign-key ordering
- JSONB column use
- index coverage
- naming consistency

## Boundary Rule

These drafts are substrate-only and must not mutate AI-control roots.
