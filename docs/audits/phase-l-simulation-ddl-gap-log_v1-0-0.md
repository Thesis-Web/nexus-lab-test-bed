# Phase L Simulation DDL Gap Log v1.0.0

## Purpose

This log captures the remaining open items after DDL planning artifacts are added.

## Open Items

### HOLE-L-001 — no executable DDL yet

Status: OPEN
Impact: high

Phase L pins future migration content and order, but no SQL files have been written yet.

### HOLE-L-002 — circular FK split not finalized

Status: OPEN
Impact: medium

The final handling for timeline-to-checkpoint circular reference still needs an explicit second-step FK plan.

### HOLE-L-003 — retention and partitioning not yet planned

Status: OPEN
Impact: medium

Future SQL still needs decisions for:

- tick ledger growth
- checkpoint retention
- archival strategy
- optional partitioning

### HOLE-L-004 — snapshot storage target not yet finalized

Status: OPEN
Impact: medium

Future implementation still needs owner approval on final storage target and serialization approach.

### HOLE-L-005 — no AI-control linkage by design

Status: OPEN
Impact: low

Phase L remains isolated from all AI-control roots and semantics.

### DIFF-L-001 — future DDL set and order are now pinned

Status: RESOLVED
Impact: low

Before Phase L, SQL persistence existed only as planning surfaces.
Phase L pins the future DDL object order and migration sequencing rules.
