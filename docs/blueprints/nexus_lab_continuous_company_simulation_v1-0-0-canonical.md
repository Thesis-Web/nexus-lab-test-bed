# Nexus Lab Continuous Company Simulation Blueprint v1.0.0 Canonical

## 1. Authority

This blueprint extends the fake-company substrate already pinned in the repo.

It governs the next layer of the lab:

- continuous company simulation
- endless-run mode
- growth-stage progression
- snapshot / pause / reset / fork control surfaces

If this blueprint conflicts with prior simulation notes or casual discussion, this file wins.

## 2. Purpose

The lab company must not behave only like a static seeded dataset or a one-shot scenario replay.

It must be capable of:

- waking up
- continuing to run on a simulated clock
- accumulating business state over time
- expanding in organizational complexity
- pausing, snapshotting, rewinding, resetting, or forking when commanded

The company is still fake.
The state transitions must still be deterministic.

## 3. Core Law

The continuous simulation is not autonomous open-ended AI.

It is a bounded, manifest-driven enterprise-world simulation with:

- a simulation clock
- declared event generators
- declared growth stages
- declared lifecycle tracks
- declared control modes

No hidden randomness is permitted in canonical mode.

## 4. Continuous Mode vs Control Mode

### 4.1 Continuous Mode

Continuous mode means:

- the company clock advances
- event generators emit business events on cadence
- departments accumulate work
- assets and facilities expand according to stage rules
- workforce lifecycle changes may occur according to staged rules
- transactional chains continue without manual reinjection each time

### 4.2 Control Mode

Control mode means the owner may:

- pause the company
- snapshot the company state
- resume from a snapshot
- rewind to a checkpoint
- reset to baseline
- fork a branch timeline for comparison testing

## 5. Canonical Simulation Surfaces

Phase F adds these simulation law surfaces:

- simulation clock registry
- growth-stage registry
- event-generator registry
- control-mode registry
- facility-lifecycle registry
- workforce-lifecycle registry
- asset-expansion registry

These are canonical registries, even before SQL or schema wiring is expanded.

## 6. Simulation Clock Law

The company runs on a simulated clock.

The clock must support:

- tick unit
- tick interval
- cadence families
- business-hour profile
- non-business-hour profile
- timezone anchor
- stage-aware cadence adjustments

Canonical cadence families:

- minute
- hourly
- daily
- weekly
- monthly
- quarterly

## 7. Growth-Stage Law

The company must progress through stage bands.

Canonical stage bands:

- small_local
- multi_site_small
- regional_midmarket
- multi_region_enterprise

Stage changes must affect:

- headcount ranges
- facility footprint
- approval complexity
- asset mix
- vendor count
- ticket and communication volume
- financial and procurement pressure

## 8. Event Generator Law

Event generators must be explicit and categorized.

Canonical generator families:

- communications
- operations
- procurement
- finance
- workforce
- facilities
- customer
- vendor
- engineering
- governance-pressure

Each generator must declare:

- cadence
- stage applicability
- trigger conditions
- output objects
- deterministic selection rules

## 9. Lifecycle Law

### 9.1 Facility Lifecycle

The lab must support:

- HQ
- warehouse
- office
- plant
- branch office
- service center
- leased site
- owned site

Facilities may be opened, expanded, consolidated, or retired by stage rules.

### 9.2 Workforce Lifecycle

The lab must support:

- requisition
- candidate
- hire
- onboarding
- transfer
- promotion
- role change
- leave
- layoff
- retirement
- termination

### 9.3 Asset Expansion Lifecycle

The lab must support:

- request
- approval
- purchase
- assignment
- maintenance
- reassignment
- retirement
- disposal

Asset classes include:

- IT equipment
- tooling
- fleet vehicle
- machinery
- office furniture
- property-improvement placeholder
- leased equipment

## 10. Normal Business Rule

The company must remain normal-business shaped, not Nexus-shaped.

This means:

- mixed cloud and local lanes
- multiple systems of record
- partial process overlap
- ordinary business disorder
- approvals by normal business channels
- local-sensitive and cloud-safe separation
- no requirement that the company be pre-shaped for Nexus

## 11. Endless-Run Rule

The company should be able to continue running until stopped.

Pause, rewind, reset, and fork are control features.
They are not the primary operating mode.

The primary operating mode is:

- start the company
- let simulated time advance
- allow state to accumulate
- observe how complexity increases over time

## 12. Out-of-Scope for Phase F

Phase F does not yet add:

- new SQL tables
- new JSON schemas
- new runtime daemons
- new Docker services
- new live external integrations
- autonomous agents
- AI-control pack logic
- Nexus runtime governance logic

Phase F is law and registry expansion only.

## 13. Exit Condition

Phase F is complete when the repo contains:

- a canonical continuous-simulation blueprint
- a matching engineering spec
- a simulation gap log
- simulation registries for clock, growth, generators, control modes, facilities, workforce, and asset expansion

These artifacts must stay outside AI-control pack roots.
