# Phase J Simulation Persistence Gap Log v1.0.0

## Purpose

This log captures the remaining open items after persistence-planning artifacts are added.

## Open Items

### HOLE-J-001 — no SQL DDL yet

Status: OPEN
Impact: high

Phase J pins table intent and persistence surfaces, but no SQL DDL has been added yet.

### HOLE-J-002 — no persistence adapter implementation yet

Status: OPEN
Impact: high

There is no implementation yet for saving or loading:

- cursors
- timelines
- checkpoints
- tick ledgers
- snapshot materializations

### HOLE-J-003 — no snapshot serialization format decision yet

Status: OPEN
Impact: medium

Future implementation still needs to lock:

- JSON bundle vs multi-part artifact
- hashing/canonicalization approach
- storage target choice

### HOLE-J-004 — no retention / pruning policy yet

Status: OPEN
Impact: medium

There is no formal policy yet for:

- checkpoint retention
- timeline archival
- tick ledger retention
- snapshot pruning

### HOLE-J-005 — no AI-control linkage by design

Status: OPEN
Impact: low

Phase J remains isolated from all AI-control roots and semantics.

### DIFF-J-001 — persistence surface is now pinned

Status: RESOLVED
Impact: low

Before Phase J, persistence expectations were implied by runner/state-control docs only.
Phase J pins the table intent, persistence commands, and worker contract surface.
