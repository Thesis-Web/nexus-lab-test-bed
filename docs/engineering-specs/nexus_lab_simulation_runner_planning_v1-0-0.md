# Nexus Lab Simulation Runner Planning Spec v1.0.0

## 1. Authority

This planning spec extends the continuous simulation law already pinned in the repo.

It defines the next bounded implementation target for simulation execution:

- semantic validation of simulation registries
- bounded simulation runner contract
- runner mode expectations
- deferred implementation boundaries

This phase does not add SQL tables, daemons, or live endless-run services.

## 2. Build Intent

The repo now has:

- simulation law
- simulation registries
- simulation schemas

The next requirement is to make simulation registries semantically coherent and to pin a bounded worker contract for the future runner.

## 3. Phase H Deliverables

Phase H adds:

- semantic checks in the main validator
- a simulation runner worker contract
- a runner planning runbook
- a Phase H gap log

## 4. Required Semantic Checks

The validator must check:

- growth stage ids are unique
- simulation clock tick ids are unique
- simulation control mode ids are unique
- event generator ids are unique
- event generator supported stages all exist in the growth-stage registry
- event generator default cadence ids all exist in the clock registry
- stage cadence multipliers cover the same canonical stage ids as the growth-stage registry
- facility lifecycle stage applicability covers the same canonical stage ids as the growth-stage registry

## 5. Required Simulation Runner Contract

A new worker contract must be added for a bounded `simulation-runner` worker.

The contract must include:

- worker id
- contract version
- purpose
- accepted commands
- input artifacts
- output artifacts
- side-effect boundaries
- explicit non-goals

## 6. Runner Modes to Plan

The runner planning must account for these future modes:

- tick_once
- tick_until
- run_continuous
- pause
- snapshot
- reset
- fork_timeline

Phase H only documents them and pins the contract surface.
It does not implement all modes.

## 7. Explicit Deferrals

Phase H does not add:

- SQL snapshot storage
- generator state persistence
- scheduler/daemon services
- Docker changes
- AI-control integration
- Nexus runtime integration

## 8. Expected Next Phase

A later phase may add:

- simulation state tables
- snapshot persistence
- runner implementation
- scheduled continuous execution
- control-plane commands for pause/reset/fork
