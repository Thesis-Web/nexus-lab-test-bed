# Simulation Persistence Surfaces v1.0.0

## Purpose

This runbook describes the intended persistence surfaces for the fake-company simulation.

## Planned Persistent Objects

### Cursor

Represents the current active simulation position for a timeline.

### Timeline

Represents a timeline lineage, including forks and current head.

### Checkpoint

Represents a point-in-time state capture on a timeline.

### Tick Ledger

Represents one applied tick plus emitted artifacts and before/after world-state hashes.

### Snapshot Materialization

Represents where a snapshot payload is stored and how it was serialized.

## Planned Commands

- persist_cursor
- persist_checkpoint
- persist_timeline
- persist_tick_ledger
- persist_snapshot_materialization
- load_cursor
- load_checkpoint
- load_timeline_head
- list_timeline_checkpoints

## Determinism Rule

Persistence must preserve deterministic replay:

- timeline lineage must remain explicit
- checkpoint ancestry must remain explicit
- world-state hashes must be stable for the same logical state
- tick ledger rows must reflect declared tick ids and generators only

## Boundary Rule

Persistence remains substrate-only.
It must not mutate AI-control roots directly.
