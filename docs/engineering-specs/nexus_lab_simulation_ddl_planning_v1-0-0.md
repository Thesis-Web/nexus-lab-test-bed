# Nexus Lab Simulation DDL Planning v1.0.0

## 1. Authority

This planning spec extends the continuous simulation law plus the prior planning layers for runner, state control, persistence, and SQL surface design.

It defines the next bounded DDL-planning layer for simulation persistence without adding live SQL files under `infra/postgres/init/`.

## 2. Intent

The simulation now has:

- registry law
- schema validation
- semantic checks
- runner planning
- state-control planning
- persistence planning
- SQL surface planning

The next requirement is to pin the future DDL shape, dependency order, and migration sequencing rules for owner review.

## 3. Phase L Deliverables

Phase L adds:

- a DDL planning spec
- a migration ordering runbook
- a Phase L gap log
- a bounded worker contract for DDL planning assistance

Phase L does not add executable SQL migrations.

## 4. Planned Future Migration Set

### L1 — create `simulation_timelines`

Purpose:

- establish root lineage table

Planned columns:

- `timeline_id text primary key`
- `source_timeline_id text null`
- `source_checkpoint_id text null`
- `created_at timestamptz not null`
- `branch_reason text null`
- `status text not null`
- `head_checkpoint_id text null`

Planned constraints:

- self-reference intent on `source_timeline_id`
- later FK intent to `simulation_checkpoints(checkpoint_id)` for `source_checkpoint_id` and `head_checkpoint_id`

Reason to create first:

- all later state objects anchor to a timeline

### L2 — create `simulation_checkpoints`

Purpose:

- capture point-in-time metadata

Planned columns:

- `checkpoint_id text primary key`
- `timeline_id text not null`
- `created_at timestamptz not null`
- `capture_mode text not null`
- `stage_id text not null`
- `simulation_timestamp timestamptz not null`
- `parent_checkpoint_id text null`
- `world_state_hash text not null`
- `notes text null`

Planned constraints:

- FK intent to `simulation_timelines(timeline_id)`
- self-reference intent on `parent_checkpoint_id`

### L3 — create `simulation_state_cursors`

Purpose:

- one active cursor per active timeline

Planned columns:

- `cursor_id text primary key`
- `timeline_id text not null unique`
- `stage_id text not null`
- `simulation_timestamp timestamptz not null`
- `last_tick_id text null`
- `total_ticks_applied bigint not null`
- `runner_mode text not null`
- `checkpoint_id text null`
- `updated_at timestamptz not null`

Planned constraints:

- FK intent to `simulation_timelines(timeline_id)`
- FK intent to `simulation_checkpoints(checkpoint_id)` nullable

### L4 — create `simulation_tick_ledger`

Purpose:

- append-only ledger of each applied tick and emitted artifact batch

Planned columns:

- `tick_ledger_id text primary key`
- `timeline_id text not null`
- `checkpoint_id text null`
- `tick_id text not null`
- `started_at timestamptz not null`
- `completed_at timestamptz not null`
- `applied_generator_ids_json jsonb not null`
- `emitted_artifact_refs_json jsonb not null`
- `world_state_hash_before text not null`
- `world_state_hash_after text not null`

Planned constraints:

- FK intent to `simulation_timelines(timeline_id)`
- FK intent to `simulation_checkpoints(checkpoint_id)` nullable

### L5 — create `simulation_snapshot_materializations`

Purpose:

- pointer table for serialized checkpoint payloads

Planned columns:

- `materialization_id text primary key`
- `checkpoint_id text not null`
- `storage_mode text not null`
- `storage_ref text not null`
- `serialization_format text not null`
- `created_at timestamptz not null`

Planned constraints:

- FK intent to `simulation_checkpoints(checkpoint_id)`

## 5. Planned Index Set

Minimum future indexes:

- `idx_simulation_timelines_status on simulation_timelines(status)`
- `idx_simulation_checkpoints_timeline_ts on simulation_checkpoints(timeline_id, simulation_timestamp desc)`
- `idx_simulation_state_cursors_timeline on simulation_state_cursors(timeline_id)`
- `idx_simulation_tick_ledger_timeline_started on simulation_tick_ledger(timeline_id, started_at desc)`
- `idx_simulation_snapshot_materializations_checkpoint on simulation_snapshot_materializations(checkpoint_id)`

## 6. Planned Enum/Domain Strategy

For early simulation DDL, prefer plain `text` columns with validated values at the application/contract layer.

Do not introduce PostgreSQL enum types in the first migration pass unless explicitly approved.

Reason:

- additive evolution is easier
- early-phase drift is cheaper to repair
- schema contracts already pin allowed values

## 7. Planned Migration Order Law

Future SQL should be emitted in dependency-safe order:

1. `simulation_timelines`
2. `simulation_checkpoints`
3. `simulation_state_cursors`
4. `simulation_tick_ledger`
5. `simulation_snapshot_materializations`

Foreign keys that create circular dependency pressure may be deferred to a second migration step if needed.

## 8. Boundary Rules

Phase L must not:

- add files under `infra/postgres/init/`
- alter existing business-domain tables
- add live migration runners
- add AI-control changes
- add cross-repo dependencies

## 9. Expected Next Layer

A later approved phase may add:

- real SQL files
- FK split-migration strategy
- repository adapter contracts
- simulation storage path conventions
- checkpoint serialization implementation notes
