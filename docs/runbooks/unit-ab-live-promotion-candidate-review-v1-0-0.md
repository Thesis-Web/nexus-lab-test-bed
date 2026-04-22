# Unit A+B Live Promotion Candidate Review v1.0.0

## Purpose

This runbook explains how to review the combined Unit A+B live-promotion candidate pack.

## Covered Files

- `infra/postgres/drafts/live-candidates/010_simulation_timelines.live-candidate.sql`
- `infra/postgres/drafts/live-candidates/020_simulation_checkpoints.live-candidate.sql`
- `infra/postgres/drafts/live-candidates/030_simulation_state_cursors.live-candidate.sql`

## Why these three belong together

Together they define the minimal base persistence path for simulation runtime:

- timeline lineage
- checkpoint lineage
- active cursor state

This is the smallest coherent SQL set that can represent simulation progression without bringing in tick-ledger or snapshot-materialization uncertainty.

## Review Rule

This candidate pack is still draft-only.
It does not become live merely because it is grouped together.

## Remaining Boundaries

- no Unit C promotion
- no Unit D promotion
- no Unit E promotion
- no AI-control changes
