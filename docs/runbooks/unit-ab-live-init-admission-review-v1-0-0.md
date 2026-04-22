# Unit A+B Live Init Admission Review v1.0.0

## Purpose

This runbook explains how to interpret the admission-review result for the combined Unit A+B live candidate pack.

## Admission Outcome

Status:

- `eligible_for_owner_approval_to_promote`

Meaning:

- the A+B pack is clean enough to be considered for live promotion
- no live promotion has happened yet
- an explicit owner decision is still required

## Why A+B passes review

- coherent minimum persistence base
- additive-only table creation
- dependency-safe ordering
- explicit constraint surfaces present
- no business-domain table mutation
- no AI-control coupling

## Why C, D, and E stay out

### Unit C

Blocked by retention / growth decisions.

### Unit D

Blocked by storage-target / serialization decisions.

### Unit E

Deferred until the base promotion path is explicitly approved.

## Boundary Rule

Admission review does not equal promotion.
No file moves into `infra/postgres/init/` in this phase.
