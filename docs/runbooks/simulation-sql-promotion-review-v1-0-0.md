# Simulation SQL Promotion Review v1.0.0

## Purpose

This runbook explains how the simulation SQL draft pack should be reviewed before any future promotion into live SQL surfaces.

## Review Sequence

1. Confirm draft-only status still holds.
2. Review Unit A base tables.
3. Review Unit B cursor table.
4. Review Unit C tick ledger.
5. Review Unit D snapshot materialization pointer table.
6. Review Unit E deferred foreign keys.
7. Record each unit as:
   - promotable_now
   - promotable_after_minor_amend
   - blocked_pending_owner_decision
   - defer_future_phase

## Review Questions

For each unit, confirm:

- Does it keep additive-first behavior?
- Does it avoid touching existing business-domain tables?
- Does it preserve deterministic replay needs?
- Does it avoid AI-control coupling?
- Does it fit local runtime law?
- Does it require any unresolved storage or retention decision?

## Promotion Rule

Nothing moves into `infra/postgres/init/` in this phase.
This is review and classification only.
