# Phase M Simulation SQL Draft Pack Gap Log v1.0.0

## Purpose

This log captures the remaining open items after first-draft SQL artifacts are added.

## Open Items

### HOLE-M-001 — draft SQL not yet approved for live apply

Status: OPEN
Impact: high

Draft SQL exists, but none of it is approved for inclusion in `infra/postgres/init/`.

### HOLE-M-002 — retention / pruning still deferred

Status: OPEN
Impact: medium

No draft SQL yet addresses:

- ledger retention
- checkpoint pruning
- archival
- optional partitioning

### HOLE-M-003 — snapshot payload storage still externalized

Status: OPEN
Impact: medium

The draft SQL stores only materialization metadata and references, not the full serialized checkpoint payload.

### HOLE-M-004 — repository adapter surfaces still deferred

Status: OPEN
Impact: medium

No implementation contracts yet bind runtime code to these draft SQL artifacts.

### HOLE-M-005 — no AI-control linkage by design

Status: OPEN
Impact: low

Phase M remains isolated from all AI-control roots and semantics.

### DIFF-M-001 — first actual SQL artifact draft pack now exists

Status: RESOLVED
Impact: low

Before Phase M, simulation SQL existed only as planning docs.
Phase M introduces concrete draft SQL files without making them live.
