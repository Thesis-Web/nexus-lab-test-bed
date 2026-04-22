# Nexus Lab Unit A Live-Candidate Amendment Pass v1.0.0

## 1. Authority

This phase extends the prior simulation SQL draft-pack and SQL promotion-classification layers.

It performs a bounded amendment pass only for Unit A:

- `010_simulation_timelines.sql`
- `020_simulation_checkpoints.sql`

The output remains draft-only and is not promoted into `infra/postgres/init/` in this phase.

## 2. Intent

Phase O classified Unit A as:

- `promotable_after_minor_amend`

Phase P performs that minor amendment pass so Unit A can be reclassified as:

- `promotable_now`

## 3. Deliverables

Phase P adds:

- a Unit A amendment spec
- a Unit A review runbook
- a Phase P gap log
- amended live-candidate SQL drafts for Unit A
- an updated promotion-decision manifest
- a bounded worker contract for live-candidate amendment assistance

## 4. Amendment Scope

Only Unit A is amended.

### 4.1 simulation_timelines amendments

The live-candidate draft adds:

- explicit status check constraint
- source-timeline lookup index
- head-checkpoint lookup index placeholder support

These are bounded safety/readiness improvements and do not change the fundamental dependency-safe split.

### 4.2 simulation_checkpoints amendments

The live-candidate draft adds:

- explicit capture-mode check constraint
- explicit stage-id check constraint
- parent-checkpoint ancestry lookup index

These are bounded safety/readiness improvements and do not change table role or ordering.

## 5. Classification Outcome

After the Unit A amendment pass, best-solve classification becomes:

- Unit A — `promotable_now`
- Unit B — `promotable_now`
- Unit C — `blocked_pending_owner_decision`
- Unit D — `blocked_pending_owner_decision`
- Unit E — `defer_future_phase`

## 6. Boundary Rules

Phase P must not:

- move any SQL into `infra/postgres/init/`
- auto-apply any SQL
- amend Units C, D, or E
- mutate AI-control roots
- alter business-domain tables

## 7. Expected Next Layer

A later approved phase may:

- choose whether to promote Unit A and/or Unit B into live init/migration surfaces
- keep C and D blocked until owner decisions are made
- revisit E after base promotion is approved
