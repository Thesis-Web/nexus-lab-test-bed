# Nexus Lab Simulation SQL Planning v1.0.0

## 1. Authority

This planning spec extends the continuous simulation law, Phase I state model planning, and Phase J persistence planning.

It defines the next bounded SQL-planning layer for simulation persistence without adding live DDL to `infra/postgres/init/*.sql`.

## 2. Intent

The simulation now has:

- continuous simulation law
- simulation registries
- simulation schemas and semantic checks
- runner planning
- state-control planning
- persistence planning

The next requirement is to pin the SQL surface for future implementation of simulation persistence.

## 3. Phase K Deliverables

Phase K adds:

- simulation SQL planning spec
- SQL surface runbook
- Phase K gap log
- bounded worker contract for future SQL planning / migration-authoring assistance

## 4. Planned SQL Objects

Future SQL work should introduce these tables when owner-approved:

### 4.1 simulation_state_cursors

Primary purpose:

- one active cursor per active timeline

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

Planned constraints:

- primary key on `cursor_id`
- unique key on `timeline_id`
- foreign-key intent to `simulation_timelines.timeline_id`
- foreign-key intent to `simulation_checkpoints.checkpoint_id` nullable

### 4.2 simulation_timelines

Primary purpose:

- persistent lineage for active and archived timelines

Planned columns:

- timeline_id
- source_timeline_id
- source_checkpoint_id
- created_at
- branch_reason
- status
- head_checkpoint_id

Planned constraints:

- primary key on `timeline_id`
- self-reference intent on `source_timeline_id`
- foreign-key intent to `simulation_checkpoints.checkpoint_id` nullable

### 4.3 simulation_checkpoints

Primary purpose:

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

Planned constraints:

- primary key on `checkpoint_id`
- foreign-key intent to `simulation_timelines.timeline_id`
- self-reference intent on `parent_checkpoint_id`

### 4.4 simulation_tick_ledger

Primary purpose:

- deterministic ledger of applied ticks and emitted event batches

Planned columns:

- tick_ledger_id
- timeline_id
- checkpoint_id
- tick_id
- started_at
- completed_at
- applied_generator_ids_json
- emitted_artifact_refs_json
- world_state_hash_before
- world_state_hash_after

Planned constraints:

- primary key on `tick_ledger_id`
- foreign-key intent to `simulation_timelines.timeline_id`
- foreign-key intent to `simulation_checkpoints.checkpoint_id` nullable

### 4.5 simulation_snapshot_materializations

Primary purpose:

- pointer table to snapshot payload storage

Planned columns:

- materialization_id
- checkpoint_id
- storage_mode
- storage_ref
- serialization_format
- created_at

Planned constraints:

- primary key on `materialization_id`
- foreign-key intent to `simulation_checkpoints.checkpoint_id`

## 5. Planned Indexing

Minimum future indexes:

- `simulation_state_cursors(timeline_id)`
- `simulation_timelines(status)`
- `simulation_checkpoints(timeline_id, simulation_timestamp)`
- `simulation_tick_ledger(timeline_id, started_at)`
- `simulation_snapshot_materializations(checkpoint_id)`

## 6. Planned Migration Law

When DDL is later introduced, it must:

- be additive first
- avoid destructive migration in early phases
- create tables in dependency order
- keep all simulation SQL isolated from AI-control roots
- keep all simulation SQL outside existing Phase C structured business tables unless explicitly approved

## 7. Explicit Deferrals

Phase K does not add:

- SQL files under `infra/postgres/init/`
- live migrations
- repository adapters
- persistence service code
- snapshot serialization implementation
- retention jobs
- AI-control changes

## 8. Expected Next Layer

A later phase may add:

- actual SQL DDL files
- migration ordering notes
- repository adapter contracts
- persistence service interfaces
- runner-to-persistence integration contracts
