# Phase N Simulation SQL Promotion Gap Log v1.0.0

## Purpose

This log captures the remaining open items after SQL promotion-planning artifacts are added.

## Open Items

### HOLE-N-001 — no live promotion decision yet

Status: OPEN
Impact: high

Phase N defines the promotion review process only.
No draft SQL file has been approved for live status yet.

### HOLE-N-002 — snapshot table still needs storage-target decision

Status: OPEN
Impact: medium

`simulation_snapshot_materializations` still depends on a later storage-target decision for durable payload handling.

### HOLE-N-003 — tick-ledger growth strategy still deferred

Status: OPEN
Impact: medium

Promotion review still needs later owner decisions for retention, pruning, and possible partitioning.

### HOLE-N-004 — FK split may still need amendment

Status: OPEN
Impact: medium

Deferred timeline checkpoint foreign keys are planned correctly in principle, but may still need exact migration wording review before promotion.

### HOLE-N-005 — no AI-control linkage by design

Status: OPEN
Impact: low

Phase N remains isolated from all AI-control roots and semantics.

### DIFF-N-001 — SQL promotion surface is now pinned

Status: RESOLVED
Impact: low

Before Phase N, draft SQL existed but promotion rules were only implied.
Phase N pins explicit review and promotion criteria.
