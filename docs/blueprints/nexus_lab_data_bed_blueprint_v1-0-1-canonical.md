# Nexus Lab Data Bed Blueprint v1.0.1 Canonical

## 1. Governing Intent

This repo exists to validate two planes under deterministic local conditions:

- **Vanguard** = inference firewall and routing plane
- **Nexus** = governance and execution plane

This build is a bounded lab data bed.
It is not an autonomous agent runtime.

## 2. Governing Law

The controlling law for this build is:

- instructions only
- no handler framework
- no delegation prose
- build directly against the local lab need
- runtime and data bed live on the big machine
- small laptop is Ollama endpoint only
- stateful database storage lives outside git
- use Docker Compose for local infra bring-up
- use Postgres for structured state
- use JSON Schema where contracts matter
- use plain filesystem storage for docs, PDFs, workbooks, fixtures, and evidence
- only bounded workers, registries, policies, schemas, and scenario manifests are in scope

## 3. Physical Topology

### Big Machine

Owns:

- repo working tree
- Docker Compose runtime
- Postgres database
- lab corpus filesystem
- evidence filesystem
- local seed data
- future bounded worker execution

### Small Laptop

Owns only:

- Ollama HTTP endpoint over LAN

It does not own:

- Postgres
- canonical manifests
- evidence store
- lab state
- control-plane logic

### Droplet

Used only for:

- repo placement
- git / GitHub operations later

It does not host lab runtime or persistent lab state.

## 4. Scope In

This version includes:

- canonical repo tree
- blueprint
- engineering spec
- Docker Compose
- Postgres bootstrap schema
- JSON-schema contracts
- actor / model / policy registries
- registry seed manifest
- domain seed manifest
- domain seed JSON
- first scenario manifest
- first bounded worker contracts
- local bring-up scripts
- deterministic seed loaders
- bring-up runbook

## 5. Scope Out

This version excludes:

- UI
- remote runtime hosting
- distributed orchestration
- cloud execution during lab runtime
- autonomous agent loops
- Kubernetes
- handler frameworks

## 6. State Law

### Structured State

Structured state lives in local Postgres.

### Filesystem State

Filesystem state is split:

- repo-tracked canonical files live in git
- local runtime state lives outside git

Local runtime state directories:

- postgres data
- corpus
- evidence
- optional pgadmin state

## 7. Determinism Law

Determinism is achieved by:

- canonical JSON registries and manifests
- JSON Schema validation
- explicit env file
- explicit host-mounted Postgres path
- bounded workers with declared side effects
- manifest-driven seed loaders
- scenario-defined expected decisions

## 8. Domain Shape for the First Lab

The initial test bed models a small manufacturing / distribution environment so the lab can exercise Dell-like operational flows without using real enterprise data.

Reference domains:

- locations
- products
- customers
- research briefs

Control domains:

- registries
- scenario runs
- decision log
- artifact index
- seed history

## 9. First Bounded Workers

- `worker-file-intake-v1`
- `worker-scenario-runner-v1`

## 10. Acceptance Conditions

The build is acceptable when:

1. Postgres starts locally through Compose.
2. Database data lands outside git.
3. Contracts validate.
4. Registry bundles load into Postgres.
5. Domain seeds load into Postgres.
6. The first scenario manifest expresses allow / deny / require-approval outcomes.
7. The small laptop remains inference-only.
