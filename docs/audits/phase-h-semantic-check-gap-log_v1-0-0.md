# Phase H Semantic Checks and Runner Planning Gap Log v1.0.0

## Purpose

This log records the gaps intentionally left open after adding semantic checks and a runner planning contract.

## Open Items

### HOLE-H-001 — no simulation runner implementation yet

Status: OPEN
Impact: high

The runner contract and runbook are pinned, but there is no executable simulation runner yet.

### HOLE-H-002 — semantic checks are bounded, not full cross-registry semantics

Status: OPEN
Impact: medium

Phase H checks:

- stage ids
- tick ids
- control mode ids
- generator ids
- stage-to-generator references
- cadence-to-generator references
- stage coverage in clock/facility registries

It does not yet enforce:

- growth stage facility profile alignment to facility classes
- asset class references across future domains
- workforce/access cross-surface relationships
- generator output target existence

### HOLE-H-003 — no SQL/runtime persistence

Status: OPEN
Impact: high

Still missing:

- simulation clock state
- snapshot persistence
- fork persistence
- generator cursor/state
- stage advancement state

### HOLE-H-004 — no AI-control link by design

Status: OPEN
Impact: low

Phase H stays out of all AI-control roots.

### DIFF-H-001 — simulation registries now have semantic gate checks

Status: RESOLVED
Impact: low

Before Phase H, simulation registries were schema-valid only.
Phase H adds bounded semantic validation.
