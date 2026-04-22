# Nexus Lab Simulation SQL Stack Planning v1.0.0

## 1. Authority

This planning document is subordinate to and must not override:

- `docs/blueprints/nexus_lab_continuous_company_simulation_v1-0-0-canonical.md`
- `docs/engineering-specs/nexus_lab_continuous_company_simulation_v1-0-0-engineering-spec.md`

This document merges and supersedes active planning content previously spread across:

- `docs/engineering-specs/nexus_lab_simulation_sql_planning_v1-0-0.md`
- `docs/engineering-specs/nexus_lab_simulation_ddl_planning_v1-0-0.md`
- `docs/engineering-specs/nexus_lab_simulation_sql_draft_pack_v1-0-0.md`
- `docs/engineering-specs/nexus_lab_simulation_sql_promotion_planning_v1-0-0.md`
- `docs/engineering-specs/nexus_lab_simulation_sql_promotion_classification_v1-0-0.md`

Those source documents should be retained as audit/provenance evidence until owner-approved archival.

## 2. Intent

Collapse SQL surface, DDL ordering, draft-pack, promotion, and classification planning into one active SQL-planning stack so the simulation persistence path has a single planning authority below the canonical continuous-simulation law.

## 3. Scope

This document governs planning for:

- future simulation persistence tables
- DDL ordering and dependency strategy
- draft SQL units under review only
- promotion criteria and classification
- live-candidate review sequence
- additive-first migration law

This document does **not** authorize:

- mutation of `infra/postgres/init/**`
- automatic bring-up application
- runtime persistence implementation
- AI-control coupling

## 4. Planned SQL Objects

The merged SQL stack plans the following objects:

- `simulation_timelines`
- `simulation_checkpoints`
- `simulation_state_cursors`
- `simulation_tick_ledger`
- `simulation_snapshot_materializations`
- deferred timeline-checkpoint foreign-key additions only after base-table stability

## 5. Canonical Dependency Order

### Step 1 — base lineage tables

- `simulation_timelines`
- `simulation_checkpoints`

### Step 2 — active cursor surface

- `simulation_state_cursors`

### Step 3 — append-style event history

- `simulation_tick_ledger`

### Step 4 — leaf-like materialization metadata

- `simulation_snapshot_materializations`

### Step 5 — deferred foreign keys

- add deferred references from `simulation_timelines` to checkpoint ids only after base tables are proven sound

## 6. Draft Unit Structure

The retained draft-pack units remain:

- Unit A: `010_simulation_timelines.sql`, `020_simulation_checkpoints.sql`
- Unit B: `030_simulation_state_cursors.sql`
- Unit C: `040_simulation_tick_ledger.sql`
- Unit D: `050_simulation_snapshot_materializations.sql`
- Unit E: `060_add_simulation_timeline_checkpoint_fks.sql`

These remain draft-only unless an owner-approved promotion path says otherwise.

## 7. Promotion Law

Promotion categories remain:

- `promotable_now`
- `promotable_after_minor_amend`
- `blocked_pending_owner_decision`
- `defer_future_phase`

Promotion review must assess:

- naming consistency
- dependency-safe order
- foreign-key timing
- nullability
- primary-key strategy
- index coverage
- additive-first behavior
- compatibility with existing business-domain tables
- compatibility with local-only runtime law

## 8. Current Best-Solve Classification

### Unit A — base tables

- `promotable_after_minor_amend`
- dependency order is sound
- deferred checkpoint reference wording still merits one more bounded pass

### Unit B — state cursor

- `promotable_now`
- bounded table
- clear dependencies
- low ambiguity

### Unit C — tick ledger

- `blocked_pending_owner_decision`
- retention and growth pressure still require explicit owner direction

### Unit D — snapshot materializations

- `blocked_pending_owner_decision`
- storage target and serialization choice remain unresolved

### Unit E — deferred foreign keys

- `defer_future_phase`
- keep deferred until the base promotion path is finalized

## 9. Determinism and Local Runtime Law

The merged SQL stack must preserve:

- explicit timeline lineage
- explicit checkpoint ancestry
- append-friendly ledger behavior
- stable hash storage
- no hidden mutable state outside declared persistence objects
- local-only runtime assumptions unless explicitly promoted beyond them

## 10. Boundary Law

This merged SQL stack must not:

- add draft SQL directly to `infra/postgres/init/`
- auto-apply drafts in bring-up scripts
- mutate business-domain table definitions
- imply live readiness without explicit owner approval
- couple simulation persistence planning to AI-control roots

## 11. Merge Judgment

The SQL stack was ready for partial merge because the phase documents were directionally aligned and increasingly repetitive. The active SQL planning surface should now be this merged document, while predecessor phase docs and gap logs remain retained audit evidence.

## 12. Retained Evidence

Keep retained as audit/provenance evidence:

- Phase K gap log
- Phase L gap log
- Phase M gap log
- Phase N gap log
- Phase O gap log
- predecessor SQL/DDL/draft/promotion/classification planning docs
