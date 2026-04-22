# Nexus Lab Unit A+B Live Promotion Candidate Pack v1.0.0

## 1. Authority

This phase extends the Unit A live-candidate amendment pass and the Unit B live-candidate packaging pass.

It creates a combined promotion-candidate pack for the simulation persistence base path without moving any SQL into `infra/postgres/init/`.

## 2. Intent

The current best-solve position is:

- Unit A — promotable_now
- Unit B — promotable_now
- Unit C — blocked_pending_owner_decision
- Unit D — blocked_pending_owner_decision
- Unit E — defer_future_phase

Phase R packages Units A and B together as the first combined live-promotion candidate set for later owner review.

## 3. Deliverables

Phase R adds:

- a combined A+B promotion-candidate spec
- a combined review runbook
- a Phase R gap log
- a combined promotion-candidate manifest
- an updated phase decision manifest
- a bounded worker contract for combined candidate packaging

## 4. Candidate Pack Scope

The combined candidate pack includes only:

- `infra/postgres/drafts/live-candidates/010_simulation_timelines.live-candidate.sql`
- `infra/postgres/drafts/live-candidates/020_simulation_checkpoints.live-candidate.sql`
- `infra/postgres/drafts/live-candidates/030_simulation_state_cursors.live-candidate.sql`

These represent the base simulation persistence path:

- timeline lineage
- checkpoint metadata
- active cursor state

## 5. Candidate Pack Purpose

This pack is the first coherent base set that could later be reviewed for controlled promotion into live SQL surfaces.

It is still:

- draft-only
- not auto-applied
- not admitted into bring-up
- subordinate to later owner approval

## 6. Classification Outcome

After Phase R, best-solve classification remains:

- Unit A — promotable_now
- Unit B — promotable_now
- Unit A+B combined pack — ready_for_live_admission_review
- Unit C — blocked_pending_owner_decision
- Unit D — blocked_pending_owner_decision
- Unit E — defer_future_phase

## 7. Boundary Rules

Phase R must not:

- move any SQL into `infra/postgres/init/`
- auto-apply any SQL
- amend Units C, D, or E
- mutate AI-control roots
- alter business-domain tables

## 8. Expected Next Layer

A later approved phase may:

- perform live-init admission review on the combined A+B pack
- decide whether A+B should be promoted together or separately
- continue to hold C and D
- continue to defer E until base promotion approval is explicit
