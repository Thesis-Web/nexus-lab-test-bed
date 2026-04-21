# Nexus Lab Simulation State Model Planning v1.0.0

## 1. Authority

This planning spec extends the continuous simulation blueprint, Phase G simulation schemas, and Phase H runner-planning layer.

It defines the next bounded planning layer for simulation state control without adding SQL tables or runtime services.

## 2. Intent

The simulation now has:

- canonical simulation registries
- schema validation
- bounded semantic checks
- runner planning

The next requirement is to pin the state model surface for:

- pause
- snapshot
- reset
- rewind
- fork timeline
- stage tracking
- tick cursor tracking

## 3. Phase I Deliverables

Phase I adds:

- state model planning spec
- state-control runbook
- Phase I gap log
- planning schemas for simulation state records
- bounded worker contract for simulation state control

## 4. Planned State Objects

### 4.1 Simulation State Cursor

A canonical cursor object must be able to describe:

- current timeline id
- current stage id
- current simulation timestamp
- last tick id applied
- total ticks applied
- current runner mode
- current checkpoint id or null

### 4.2 Simulation Checkpoint Record

A checkpoint object must be able to describe:

- checkpoint id
- timeline id
- created at
- created by mode or command
- stage id at capture
- simulation timestamp at capture
- optional parent checkpoint id
- world state hash placeholder
- notes

### 4.3 Simulation Timeline Record

A timeline object must be able to describe:

- timeline id
- source timeline id or null
- source checkpoint id or null
- created at
- branch reason
- status
- current head checkpoint id or null

## 5. Planned Commands

The state-control layer must be able to accept:

- pause
- resume
- snapshot
- reset
- rewind_to_checkpoint
- fork_from_checkpoint
- set_stage
- set_clock

Phase I pins the command surfaces only.
It does not implement them.

## 6. Boundary Rules

Phase I must not:

- add SQL tables
- add daemon services
- add Docker changes
- add AI-control mutations
- add live endless-run implementation
- add cross-repo dependencies

## 7. Expected Next Layer

A later implementation phase may add:

- SQL persistence for state cursor / checkpoints / timelines
- runner integration
- snapshot materialization
- timeline branching persistence
- state-control CLI or service entrypoints
