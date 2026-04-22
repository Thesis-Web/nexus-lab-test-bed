# Phase K Simulation SQL Planning Gap Log v1.0.0

## Purpose

This log captures the remaining open items after simulation SQL planning artifacts are added.

## Open Items

### HOLE-K-001 — no live DDL yet

Status: OPEN
Impact: high

Phase K pins table shape and constraint intent only.
No SQL has been added to `infra/postgres/init/*.sql`.

### HOLE-K-002 — JSON column strategy not yet locked

Status: OPEN
Impact: medium

Future SQL still needs owner approval on how to represent:

- applied generator ids
- emitted artifact refs
- potential snapshot metadata expansion

### HOLE-K-003 — world-state hash derivation not yet wired to persistence

Status: OPEN
Impact: medium

Hash fields are planned but not yet connected to a persisted canonicalization path.

### HOLE-K-004 — no migration order file yet

Status: OPEN
Impact: medium

Dependency order is described in docs but not yet represented as an applied migration sequence.

### HOLE-K-005 — no AI-control linkage by design

Status: OPEN
Impact: low

Phase K remains isolated from all AI-control roots and semantics.

### DIFF-K-001 — simulation SQL surface is now pinned

Status: RESOLVED
Impact: low

Before Phase K, persistence expectations were planned but not translated into a future SQL object map.
Phase K pins that map without applying DDL.
