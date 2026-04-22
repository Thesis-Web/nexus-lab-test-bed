# Unit A Live-Candidate Review v1.0.0

## Purpose

This runbook explains how to review the amended Unit A live-candidate drafts.

## Covered Files

- `infra/postgres/drafts/live-candidates/010_simulation_timelines.live-candidate.sql`
- `infra/postgres/drafts/live-candidates/020_simulation_checkpoints.live-candidate.sql`

## What changed

### timelines

- explicit status check constraint
- source-timeline lookup index
- head-checkpoint lookup index for later back-link usage

### checkpoints

- explicit capture-mode check constraint
- explicit stage-id check constraint
- parent-checkpoint lookup index

## Review Rule

These files are still draft-only.
They do not become live merely because they are now classified as promotable_now.

## Remaining Boundaries

- no Unit C promotion
- no Unit D promotion
- no Unit E promotion
- no AI-control changes
