# Nexus Lab Unit A+B Live Init Admission Review v1.0.0

## 1. Authority

This phase extends the Unit A+B live-promotion candidate pack.

It performs admission-review planning for the combined A+B candidate set without moving any SQL into `infra/postgres/init/`.

## 2. Intent

Phase R established the smallest coherent simulation persistence base candidate:

- timelines
- checkpoints
- state cursors

Phase S determines whether that combined pack is suitable for live-init admission review and records the explicit readiness gate.

## 3. Deliverables

Phase S adds:

- a live-init admission review spec
- a promotion-prep runbook
- a Phase S gap log
- an admission-review manifest
- an updated phase decision manifest
- a bounded worker contract for live-init admission review

## 4. Admission Review Scope

Covered candidate files:

- `infra/postgres/drafts/live-candidates/010_simulation_timelines.live-candidate.sql`
- `infra/postgres/drafts/live-candidates/020_simulation_checkpoints.live-candidate.sql`
- `infra/postgres/drafts/live-candidates/030_simulation_state_cursors.live-candidate.sql`

Excluded from admission:

- Unit C tick ledger
- Unit D snapshot materializations
- Unit E deferred checkpoint foreign keys

## 5. Admission Criteria

The combined A+B candidate set must satisfy:

- additive-only table creation behavior
- no mutation of existing business-domain tables
- dependency-safe ordering
- explicit constraint surface for status / capture_mode / stage_id / runner_mode / total_ticks
- no AI-control coupling
- suitability for local-machine runtime law
- clean separation from unresolved ledger / snapshot / deferred-FK concerns

## 6. Best-Solve Admission Result

Phase S records the combined A+B pack as:

- `eligible_for_owner_approval_to_promote`

This is not live promotion.
It means the pack is clean enough for an explicit owner decision on whether to admit it into live init or migration surfaces.

## 7. Boundary Rules

Phase S must not:

- copy files into `infra/postgres/init/`
- auto-apply any SQL
- unblock Units C or D
- undeerfer Unit E
- mutate AI-control roots
- alter business-domain tables

## 8. Expected Next Layer

A later owner-approved phase may:

- promote the approved A+B SQL files into live init surfaces
- update bring-up or migration ordering notes
- continue deferring or blocking Units C, D, and E
