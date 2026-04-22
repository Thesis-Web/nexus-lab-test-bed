# Nexus Lab Simulation Persistence Planning v1.0.0

## 1. Authority

This planning spec extends the continuous simulation law, Phase H runner planning, and Phase I state model planning.

It defines the next bounded persistence-planning layer for simulation state without adding live SQL tables or runtime services in this phase.

## 2. Intent

The simulation now has:

- canonical simulation registries
- schema validation
- semantic checks
- runner-planning artifacts
- state-control planning artifacts

The next requirement is to pin the persistence surface for:

- active simulation cursor state
- timeline persistence
- checkpoint persistence
- tick/event batch persistence
- snapshot materialization metadata

## 3. Phase J Deliverables

Phase J adds:

- simulation persistence planning spec
- persistence runbook
- Phase J gap log
- planning schemas for persistence records
- bounded worker contract for simulation persistence management

## 4. Planned Persistence Tables

Phase J pins the future table intent only.

### 4.1 simulation_state_cursors

Purpose:

- current state per active timeline

Planned columns:

- cursor_id
- timeline_id
- stage_id
- simulation_timestamp
- last_tick_id
- total_ticks_applied
- runner_mode
- checkpoint_id
- updated_at

### 4.2 simulation_timelines

Purpose:

- persistent timeline lineage and branch status

Planned columns:

- timeline_id
- source_timeline_id
- source_checkpoint_id
- created_at
- branch_reason
- status
- head_checkpoint_id

### 4.3 simulation_checkpoints

Purpose:

- point-in-time checkpoint metadata

Planned columns:

- checkpoint_id
- timeline_id
- created_at
- capture_mode
- stage_id
- simulation_timestamp
- parent_checkpoint_id
- world_state_hash
- notes

### 4.4 simulation_tick_ledger

Purpose:

- deterministic record of applied ticks and emitted event batches

Planned columns:

- tick_ledger_id
- timeline_id
- checkpoint_id
- tick_id
- started_at
- completed_at
- applied_generator_ids
- emitted_artifact_refs
- world_state_hash_before
- world_state_hash_after

### 4.5 simulation_snapshot_materializations

Purpose:

- future pointer table for snapshot payload storage

Planned columns:

- materialization_id
- checkpoint_id
- storage_mode
- storage_ref
- serialization_format
- created_at

## 5. Planned Indexing Rules

Future implementation should index at minimum:

- simulation_state_cursors.timeline_id
- simulation_timelines.status
- simulation_checkpoints.timeline_id + simulation_timestamp
- simulation_tick_ledger.timeline_id + started_at
- simulation_snapshot_materializations.checkpoint_id

## 6. Planned Persistence Commands

The persistence layer must be able to accept:

- persist_cursor
- persist_checkpoint
- persist_timeline
- persist_tick_ledger
- persist_snapshot_materialization
- load_cursor
- load_checkpoint
- load_timeline_head
- list_timeline_checkpoints

Phase J pins the command surfaces only.
It does not implement them.

## 7. Boundary Rules

Phase J must not:

- create SQL migrations yet
- mutate infra/postgres/init/\*.sql
- add live persistence services
- add AI-control mutations
- add cross-repo dependencies

## 8. Expected Next Layer

A later implementation phase may add:

- actual SQL DDL
- repository adapters
- checkpoint serialization formats
- persistence service entrypoints
- runner-to-persistence integration
