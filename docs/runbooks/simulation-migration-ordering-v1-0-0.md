# Simulation Migration Ordering v1.0.0

## Purpose

This runbook captures the intended migration ordering for future simulation persistence DDL.

## Recommended Ordering

### Step 1

Create `simulation_timelines`.

Reason:

- all later simulation persistence rows attach to a timeline

### Step 2

Create `simulation_checkpoints`.

Reason:

- state cursor and snapshot tables can then point to checkpoints

### Step 3

Create `simulation_state_cursors`.

Reason:

- active simulation state should attach only after timelines and checkpoints exist

### Step 4

Create `simulation_tick_ledger`.

Reason:

- tick ledger rows depend on established timelines and optional checkpoints

### Step 5

Create `simulation_snapshot_materializations`.

Reason:

- materializations are leaf-like pointer records that depend on checkpoints

## Circular Reference Note

Two fields may require delayed FK addition in a later migration step:

- `simulation_timelines.source_checkpoint_id`
- `simulation_timelines.head_checkpoint_id`

This is acceptable if needed to preserve additive migration order.

## Determinism Rule

Migration planning must preserve deterministic replay support:

- explicit lineage
- explicit checkpoint ancestry
- append-friendly tick ledger
- stable hash fields
- no hidden state outside declared persistence objects

## Boundary Rule

These migration notes apply only to substrate/simulation persistence.
They must not modify AI-control surfaces.
