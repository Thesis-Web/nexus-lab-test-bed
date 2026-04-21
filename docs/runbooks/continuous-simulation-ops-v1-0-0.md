# Continuous Simulation Ops v1.0.0

## Purpose

This runbook explains the intended operating model for the fake company after Phase F law pinning.

## Primary Mode

Primary mode is:

- start the company
- let simulated time advance
- keep the company running
- allow business state to accumulate

The goal is not only replay.
The goal is ongoing enterprise-like motion.

## Control Features

Control features are secondary but required:

- pause
- snapshot
- resume
- rewind
- reset
- fork timeline

These exist so testing can compare outcomes across time and branches.

## Determinism Rule

The company may keep running indefinitely, but the rules must still be deterministic.

Determinism comes from:

- declared clock profiles
- declared stage bands
- declared event generators
- declared lifecycle registries
- declared transition rules

No uncontrolled randomness should determine canonical state.

## Endless-Run Examples

Examples of continuous company motion include:

- hourly customer communications
- daily procurement and inventory changes
- weekly finance close-lite events
- workforce onboarding or departures
- new facility opening at later stages
- new asset classes appearing as the company grows

## Deferred Implementation

This runbook does not imply the runtime loop already exists.

Later phases may implement:

- a simulation runner
- snapshot persistence
- fork controls
- endless-run daemons or scheduled jobs

Phase F only pins the law and registry surfaces.
