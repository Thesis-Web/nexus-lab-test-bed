# Phase F Continuous Simulation Gap Log v1.0.0

## Purpose

This log captures continuous-simulation gaps surfaced by owner direction and held out of this phase.

Phase F is law + registry only.
No SQL, schema, validator, or daemon wiring is added here.

## Open Items

### HOLE-F-001 — simulation registries not yet schema-wired

Status: OPEN
Impact: medium

The simulation registries are canonical but not yet covered by dedicated JSON Schemas or the main validator.

### HOLE-F-002 — no SQL support yet for continuous simulation state

Status: OPEN
Impact: high

Not yet modeled in SQL:

- simulation clock state
- snapshot records
- forked timeline records
- stage progression records
- event-generator state

### HOLE-F-003 — facility/property depth not yet modeled

Status: OPEN
Impact: medium

Still missing deeper structured treatment for:

- leases
- owned property
- occupancy costs
- utility / property events
- regional facility clusters

### HOLE-F-004 — workforce lifecycle depth not yet modeled

Status: OPEN
Impact: medium

Still missing deeper structured treatment for:

- candidate pipeline
- onboarding plans
- access start/stop
- equipment assignments
- promotion history
- layoffs / retirement events

### HOLE-F-005 — fixed asset accounting depth not yet modeled

Status: OPEN
Impact: medium

Still missing deeper treatment for:

- depreciation placeholders
- capex classes
- retirement / disposal accounting
- asset maintenance cost rollup

### HOLE-F-006 — endless-run implementation not yet built

Status: OPEN
Impact: high

The law and registries now describe endless-run mode, but the actual runtime loop and control-plane implementation are deferred.

### DIFF-F-001 — previous mutation-driven model was too thin

Status: LOGGED
Impact: resolved by law layer only

Prior repo state supported seed + mutation + scenario replay.
Owner clarified the target must be an endless-running company simulation with optional control features.

## Boundary Reminder

These gaps must not be solved by mutating AI-control pack roots.
