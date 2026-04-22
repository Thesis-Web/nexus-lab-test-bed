# Nexus Lab Unit B Live-Candidate Packaging v1.0.0

## 1. Authority

This phase extends the simulation SQL promotion-classification layer and follows the Unit A live-candidate amendment pass.

It packages Unit B as an explicit live-candidate surface while keeping all SQL outside `infra/postgres/init/`.

## 2. Intent

Phase O classified Unit B as `promotable_now`.
Phase Q turns that status into an explicit live-candidate pack so Unit B can be reviewed alongside Unit A.

## 3. Deliverables

Phase Q adds:

- a Unit B packaging spec
- a Unit B review runbook
- a Phase Q gap log
- a live-candidate SQL file for Unit B
- an updated promotion-decision manifest
- a bounded worker contract for Unit B packaging

## 4. Unit B Scope

Covered file family:

- `030_simulation_state_cursors.sql`

Live-candidate packaging adds only bounded safety/readiness improvements:

- explicit stage-id check constraint
- explicit runner-mode check constraint
- explicit non-negative total-ticks check constraint
- retained dependency-safe foreign-key structure

## 5. Classification Outcome

After Phase Q, best-solve classification remains:

- Unit A — `promotable_now`
- Unit B — `promotable_now`
- Unit C — `blocked_pending_owner_decision`
- Unit D — `blocked_pending_owner_decision`
- Unit E — `defer_future_phase`

## 6. Boundary Rules

Phase Q must not:

- move any SQL into `infra/postgres/init/`
- auto-apply any SQL
- amend Units C, D, or E
- mutate AI-control roots
- alter business-domain tables

## 7. Expected Next Layer

A later approved phase may:

- prepare a combined live-promotion candidate pack for Units A and B
- hold C and D until owner decisions are made
- keep E deferred until base promotion approval is explicit
