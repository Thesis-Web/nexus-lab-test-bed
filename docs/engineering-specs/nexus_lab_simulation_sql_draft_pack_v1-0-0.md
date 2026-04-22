# Nexus Lab Simulation SQL Draft Pack v1.0.0

## 1. Authority

This phase extends the prior simulation persistence and DDL planning layers.

It introduces the first real SQL draft artifacts for simulation persistence, but these drafts are not yet part of live bring-up.

## 2. Intent

Phase M converts the previously planned SQL object map into concrete draft SQL files for owner review.

These files are:

- draft only
- not wired into `infra/postgres/init/`
- not applied automatically
- dependency-safe and split where circular references would create ordering risk

## 3. Deliverables

Phase M adds:

- draft SQL files under `infra/postgres/drafts/`
- a draft manifest describing ordering and purpose
- a runbook for review/apply sequencing
- a phase gap log
- a bounded worker contract for future SQL draft authoring/revision

## 4. Draft Migration Set

### M010 — simulation_timelines

Creates the root timeline table without checkpoint foreign keys.

### M020 — simulation_checkpoints

Creates checkpoint table with timeline foreign key and self-parent foreign key.

### M030 — simulation_state_cursors

Creates one active cursor per timeline with nullable checkpoint foreign key.

### M040 — simulation_tick_ledger

Creates append-only tick ledger with optional checkpoint foreign key.

### M050 — simulation_snapshot_materializations

Creates snapshot materialization pointer table with checkpoint foreign key.

### M060 — add deferred timeline checkpoint foreign keys

Adds foreign keys for:

- `simulation_timelines.source_checkpoint_id`
- `simulation_timelines.head_checkpoint_id`

This file is intentionally split out because timelines are created before checkpoints to preserve dependency-safe ordering.

## 5. Boundary Rules

Phase M must not:

- add these drafts to `infra/postgres/init/`
- auto-apply them in bring-up scripts
- mutate AI-control roots
- change business-domain table definitions
- imply live readiness without explicit owner approval

## 6. Expected Next Layer

A later approved phase may:

- review and amend these drafts
- promote selected draft SQL into live migration or init surfaces
- add repository adapter contracts
- add persistence service implementation
