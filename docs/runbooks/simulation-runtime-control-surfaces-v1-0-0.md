# Simulation Runtime Control Surfaces v1.0.0

## Purpose

Provide one active operator runbook for the merged simulation runtime-planning stack.

## Canonical Control Surfaces

### Tick execution

- `tick_once`
- `tick_until`
- bounded continuous run only when explicitly approved

### State control

- `pause`
- `resume`
- `snapshot`
- `reset`
- `rewind_to_checkpoint`
- `fork_from_checkpoint`
- `set_stage` only as explicit control action
- `set_clock` only as explicit control action

### Persistence surfaces

- persist cursor
- persist checkpoint
- persist timeline
- persist tick ledger rows
- persist snapshot materialization metadata
- load cursor
- load checkpoint
- resolve timeline head
- list timeline checkpoints

## Operator Rules

- treat timeline lineage as explicit and inspectable
- treat checkpoint ancestry as explicit and inspectable
- never assume hidden state outside declared runtime objects
- do not invent ad hoc commands beyond the declared worker contracts
- do not treat planned persistence as live-ready without owner approval

## Bounded Worker Use

### Simulation runner worker

Use for declared tick and control commands only.

### Simulation state manager worker

Use for explicit state transitions only.

### Simulation persistence manager worker

Use for declared persistence operations only.

## Runtime Triage Checklist

1. Confirm timeline id and active cursor.
2. Confirm current stage id and simulation timestamp.
3. Confirm requested mode or command is declared.
4. Confirm persistence side effects are bounded and inspectable.
5. Confirm no AI-control or unrelated business-domain surfaces are being touched.
6. Confirm any rewind/fork/reset action has explicit justification.

## Boundary Rule

Do not use this runbook to:

- mutate SQL init surfaces
- approve live migration promotion
- authorize runtime code implementation
- couple simulation operations to AI-control roots
