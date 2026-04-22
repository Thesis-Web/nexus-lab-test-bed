# Simulation SQL Live Candidate Review v1.0.0

## Purpose

This runbook explains how to interpret the current draft SQL classifications.

## Current Unit Status

### Unit A — base tables

Status:

- `promotable_after_minor_amend`

Meaning:

- close to live-candidate readiness
- still needs one bounded amendment/review pass

### Unit B — state cursor

Status:

- `promotable_now`

Meaning:

- technically ready for owner review if a live-candidate phase is approved

### Unit C — tick ledger

Status:

- `blocked_pending_owner_decision`

Meaning:

- do not promote until growth/retention questions are answered

### Unit D — snapshot materialization

Status:

- `blocked_pending_owner_decision`

Meaning:

- do not promote until storage target and serialization choice are approved

### Unit E — deferred foreign keys

Status:

- `defer_future_phase`

Meaning:

- leave deferred until the base promotion path is finalized

## Boundary Rule

Classification does not equal promotion.
No SQL becomes live in this phase.
