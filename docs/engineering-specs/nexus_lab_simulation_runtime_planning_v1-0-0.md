# Nexus Lab Simulation Runtime Planning v1.0.0

## 1. Authority

This planning document is subordinate to and must not override:

- `docs/blueprints/nexus_lab_continuous_company_simulation_v1-0-0-canonical.md`
- `docs/engineering-specs/nexus_lab_continuous_company_simulation_v1-0-0-engineering-spec.md`

This document merges and supersedes active planning content previously spread across:

- `docs/engineering-specs/nexus_lab_simulation_runner_planning_v1-0-0.md`
- `docs/engineering-specs/nexus_lab_simulation_state_model_planning_v1-0-0.md`
- `docs/engineering-specs/nexus_lab_simulation_persistence_planning_v1-0-0.md`

Those source documents should be retained as audit/provenance evidence until owner-approved archival.

## 2. Intent

Collapse runner, state-model, and persistence planning into one active runtime-planning stack so the simulation control plane has one authoritative planning surface below the canonical continuous-simulation law.

## 3. Scope

This document governs planning for:

- simulation runner modes
- simulation state objects
- state-control commands
- persistence objects and lifecycle
- bounded worker contracts for runtime/state/persistence control
- semantic validation expectations needed before implementation promotion

This document does **not** authorize:

- SQL init mutation
- live migration application
- runtime code implementation
- AI-control coupling

## 4. Runtime Planning Surfaces

### 4.1 Runner Modes

The planned runtime modes remain:

- `tick_once`
- `tick_until`
- `run_continuous`
- `pause`
- `snapshot`
- `reset`
- `fork_timeline`
- `rewind_to_checkpoint`
- `resume`
- bounded clock/stage override commands only when explicitly approved

### 4.2 State Objects

The active planning state objects are:

- simulation state cursor
- simulation timeline record
- simulation checkpoint record
- tick ledger record
- snapshot materialization record

### 4.3 Persistence Surfaces

The active persistence surfaces are:

- cursor persistence
- timeline persistence
- checkpoint persistence
- tick ledger persistence
- snapshot materialization persistence
- lineage lookup and head resolution

## 5. Canonical Runtime Object Model

### 5.1 Simulation State Cursor

Minimum planning fields:

- `cursor_id`
- `timeline_id`
- `stage_id`
- `simulation_timestamp`
- `last_tick_id`
- `total_ticks_applied`
- `runner_mode`
- `checkpoint_id`
- `updated_at`

### 5.2 Simulation Timeline Record

Minimum planning fields:

- `timeline_id`
- `source_timeline_id`
- `source_checkpoint_id`
- `created_at`
- `branch_reason`
- `status`
- `head_checkpoint_id`

### 5.3 Simulation Checkpoint Record

Minimum planning fields:

- `checkpoint_id`
- `timeline_id`
- `created_at`
- `capture_mode`
- `stage_id`
- `simulation_timestamp`
- `parent_checkpoint_id`
- `world_state_hash`
- `notes`

### 5.4 Simulation Tick Ledger Record

Minimum planning fields:

- `tick_ledger_id`
- `timeline_id`
- `checkpoint_id` nullable
- `tick_id`
- `generator_id`
- `applied_at`
- `event_batch_hash`
- `event_count`

### 5.5 Simulation Snapshot Materialization Record

Minimum planning fields:

- `materialization_id`
- `checkpoint_id`
- `storage_target`
- `serialization_format`
- `materialized_at`
- `artifact_pointer`
- `artifact_hash`

## 6. Required Semantic Checks

The active runtime-planning semantic checks are:

- growth stage ids are unique
- simulation clock tick ids are unique
- control mode ids are unique
- event generator ids are unique
- supported stage ids resolve against the growth-stage registry
- default cadence ids resolve against the clock registry
- stage cadence multipliers cover the canonical growth-stage ids
- facility lifecycle stage applicability covers the canonical growth-stage ids
- persistence/state object references preserve explicit timeline lineage and checkpoint ancestry
- no runtime planning surface implies hidden mutable state outside declared simulation records

## 7. Worker Contract Planning

The runtime-planning stack assumes bounded worker contracts only.

### 7.1 Simulation Runner Worker

Purpose:

- execute bounded simulation ticks and control commands
- produce declared event/mutation outputs only

Must declare:

- accepted commands
- required inputs
- produced outputs
- side-effect boundaries
- explicit non-goals

### 7.2 Simulation State Manager Worker

Purpose:

- manage pause/resume/snapshot/reset/rewind/fork state transitions
- maintain explicit timeline/head/checkpoint relationships

### 7.3 Simulation Persistence Manager Worker

Purpose:

- persist declared runtime/state objects
- materialize checkpoint-associated persistence metadata only
- never exceed declared local runtime boundaries

## 8. Determinism Law

Runtime planning must preserve:

- declared clock/tick profiles only
- declared stage bands only
- declared event generators only
- explicit lineage and ancestry only
- stable hash generation for the same logical state
- no hidden side-channel state outside declared runtime objects

## 9. Boundary Law

This merged runtime-planning stack must not:

- mutate `infra/postgres/init/**`
- imply live persistence readiness
- imply autonomous background daemons without explicit owner approval
- mutate substrate implementation surfaces directly
- couple runtime planning to AI-control roots

## 10. Merge Judgment

The runtime-planning layers were mature enough to merge because the earlier phase documents were additive and non-contradictory, but increasingly duplicative. The active runtime planning surface should now be this merged document, while the predecessor phase docs remain retained evidence.

## 11. Retained Evidence

Keep retained as audit/provenance evidence:

- Phase H gap log
- Phase I gap log
- Phase J gap log
- predecessor runner/state/persistence planning docs
