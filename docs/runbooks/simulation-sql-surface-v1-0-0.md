# Simulation SQL Surface v1.0.0

## Purpose

This runbook describes the intended SQL surface for future simulation persistence.

## Planned Table Roles

### simulation_state_cursors

Tracks the current active state for each active timeline.

### simulation_timelines

Tracks lineage, branching, and current head checkpoint.

### simulation_checkpoints

Tracks point-in-time captures on a timeline.

### simulation_tick_ledger

Tracks one applied tick plus emitted artifacts and before/after state hashes.

### simulation_snapshot_materializations

Tracks where snapshot payloads are stored and in what format.

## Planned Dependency Order

Future DDL should likely create tables in this order:

1. `simulation_timelines`
2. `simulation_checkpoints`
3. `simulation_state_cursors`
4. `simulation_tick_ledger`
5. `simulation_snapshot_materializations`

## Determinism Rule

The SQL surface must preserve deterministic replay:

- explicit timeline lineage
- explicit checkpoint ancestry
- stable hash storage
- declared tick ids and generator ids only

## Boundary Rule

Simulation SQL remains substrate-only.
It must not mutate AI-control roots directly.
