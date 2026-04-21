# Simulation State Control Surfaces v1.0.0

## Purpose

This runbook describes the intended state-control surfaces for the fake-company simulation.

## Primary Surfaces

### pause

Stop further clock advancement while preserving the current timeline and checkpoint head.

### resume

Continue from the current state cursor without changing the current timeline id.

### snapshot

Capture a checkpoint at the current simulation timestamp and current stage.

### reset

Return to baseline seed state and clear active timeline progression.

### rewind_to_checkpoint

Move the active state cursor to a prior checkpoint on the same timeline.

### fork_from_checkpoint

Create a new timeline beginning from an existing checkpoint.

### set_stage

Move the simulation into a declared stage for controlled testing.

### set_clock

Move the simulation clock to a declared timestamp for controlled testing.

## Determinism Rule

These surfaces must remain deterministic.
The same state-control command on the same checkpoint and timeline must produce the same result.

## Boundary Rule

State control is still substrate-only.
It must not mutate AI-control roots directly.
