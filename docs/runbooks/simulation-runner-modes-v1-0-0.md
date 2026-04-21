# Simulation Runner Modes v1.0.0

## Purpose

This runbook explains the intended bounded execution model for the future simulation runner.

## Phase H Status

Phase H does not implement the runner.
It defines the contract and mode expectations only.

## Planned Modes

### tick_once

Advance the company by one declared tick profile and apply the resulting event set once.

### tick_until

Advance until a declared timestamp or stage threshold is reached, then stop.

### run_continuous

Run the simulation continuously until stopped by command.

### pause

Stop advancing simulated time while preserving state.

### snapshot

Capture a checkpoint for later comparison or return.

### reset

Return to baseline seed state.

### fork_timeline

Create a branch timeline from a prior checkpoint.

## Determinism Rule

All modes must remain deterministic.
Continuous operation does not allow uncontrolled randomness.

## Side-Effect Boundary

The runner may only touch:

- declared simulation state
- declared mutation/event outputs
- declared artifact sinks

It must not mutate AI-control roots directly.
