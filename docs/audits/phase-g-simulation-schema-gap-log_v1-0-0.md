# Phase G Simulation Schema and Validator Gap Log v1.0.0

## Purpose

This log records what Phase G adds and what remains intentionally deferred.

Phase G adds:

- simulation JSON Schemas
- validator wiring for simulation registries

Phase G does not add:

- simulation SQL tables
- snapshot persistence
- endless-run daemons
- stage-advancement runtime
- AI-control pack changes

## Open Items

### HOLE-G-001 — simulation registries validate shape only

Status: OPEN
Impact: medium

Phase G validates structural correctness but does not yet enforce deeper semantic cross-file checks such as:

- facility class references against facility lifecycle registry
- generator stage references against growth-stage registry
- cadence references against clock registry
- cross-registry uniqueness beyond local file constraints

### HOLE-G-002 — no simulation runtime state persistence

Status: OPEN
Impact: high

Still missing:

- simulation clock state table
- snapshot table
- forked timeline table
- generator cursor/state table

### HOLE-G-003 — no simulation runner yet

Status: OPEN
Impact: high

The law and registries now describe endless-run mode, but the actual runner loop is still deferred.

### HOLE-G-004 — no AI-control integration by design

Status: OPEN
Impact: low

Simulation schemas and validator wiring stay out of all AI-control roots.

### DIFF-G-001 — validator now covers simulation registries

Status: RESOLVED
Impact: low

Before Phase G, simulation registries were canonized by law but not covered by schema validation.
Phase G closes that validation gap.
