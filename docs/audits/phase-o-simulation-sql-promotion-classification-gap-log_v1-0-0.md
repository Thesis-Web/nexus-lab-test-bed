# Phase O Simulation SQL Promotion Classification Gap Log v1.0.0

## Purpose

This log captures the remaining open items after draft SQL promotion classifications are recorded.

## Open Items

### HOLE-O-001 — no live SQL promotion yet

Status: OPEN
Impact: high

Phase O classifies draft SQL units only.
No file is promoted into `infra/postgres/init/` yet.

### HOLE-O-002 — Unit A still needs amendment pass

Status: OPEN
Impact: medium

The base table set is close, but still benefits from one more explicit live-candidate amendment pass before promotion.

### HOLE-O-003 — tick-ledger retention decision unresolved

Status: OPEN
Impact: medium

Unit C remains blocked pending owner decision on growth, retention, and optional partitioning strategy.

### HOLE-O-004 — snapshot storage target unresolved

Status: OPEN
Impact: medium

Unit D remains blocked pending owner decision on durable storage and serialization target.

### HOLE-O-005 — deferred foreign-key unit intentionally postponed

Status: OPEN
Impact: low

Unit E remains deferred until the base-table promotion path is cleaner.

### HOLE-O-006 — no AI-control linkage by design

Status: OPEN
Impact: low

Phase O remains isolated from all AI-control roots and semantics.

### DIFF-O-001 — draft SQL units are now explicitly classified

Status: RESOLVED
Impact: low

Before Phase O, the promotion process existed but no explicit unit-level decisions were recorded.
Phase O records those decisions.
