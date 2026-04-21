# Nexus Lab Fake Company Topology Engineering Spec v1.0.0

## 1. Authority

This spec implements:

- `docs/blueprints/nexus_lab_data_bed_blueprint_v1-0-1-canonical.md`
- `docs/blueprints/nexus_lab_fake_company_scope_pack_v1-0-0-canonical.md`
- `docs/blueprints/nexus_lab_fake_company_topology_v1-0-0-canonical.md`

If this spec conflicts with the governing blueprint documents, the blueprint documents win.

## 2. Build Objective

Phase D adds the missing topology layer to the synthetic company substrate and prepares a non-git local runtime bundle.

## 3. Required Repo Additions

Add these canonical files:

- `docs/blueprints/nexus_lab_fake_company_topology_v1-0-0-canonical.md`
- `docs/engineering-specs/nexus_lab_fake_company_topology_v1-0-0-engineering-spec.md`
- `docs/audits/phase-d-topology-gap-log_v1-0-0.md`
- `docs/runbooks/local-runtime-deployment-v1-0-0.md`
- `packages/contracts/schemas/topology-*.schema.json`
- `lab_data/topology/*.registry.json`

## 4. Required Topology Registries

The following machine-readable registries are required:

1. department registry
2. mailbox registry
3. system registry
4. data-zone registry
5. ingress-point registry
6. transactional-chain registry

## 5. Registry Content Rules

### 5.1 Department Registry

Each entry must contain:

- department code
- display name
- manager actor id
- primary systems
- default data zone

### 5.2 Mailbox Registry

Each entry must contain:

- mailbox id
- email address
- mailbox type
- owner reference
- department code or vendor classification
- primary system
- default data zone

### 5.3 System Registry

Each entry must contain:

- system id
- display name
- category
- deployment lane
- primary interfaces
- system-of-record flag
- sensitive-default flag

### 5.4 Data-Zone Registry

Each entry must contain:

- zone id
- title
- sensitivity class
- residency model
- allowed systems
- usage notes

### 5.5 Ingress Registry

Each entry must contain:

- ingress id
- title
- channel type
- landing system id
- default data zone
- evidence required flag
- notes

### 5.6 Transactional-Chain Registry

Each entry must contain:

- chain id
- title
- objective
- ingress ids
- systems involved
- actor roles
- state objects
- approval points
- local-only steps
- outcome types

## 6. Schema Validation Requirement

All topology registries must validate through `scripts/validate/validate-manifests.mjs`.

## 7. Local Runtime Bundle Requirement

Produce a local runtime bundle that contains:

- package files required by node / pnpm scripts
- infra compose and SQL files
- lab data registries, topology, corpus, mutations, scenarios, seeds
- package contract files
- local, seed, and validate scripts
- runbooks required for local bring-up

The bundle must not contain git metadata.

## 8. Deployment Model

The local runtime bundle must be deployable to a non-repo path such as:

- `~/runtime/nexus-lab-test-bed`

The operator must then be able to:

- copy an existing local `lab.env` into `infra/env/lab.env`
- install node dependencies locally
- run manifest validation locally
- start local compose locally
- seed local state locally

## 9. Explicit Deferrals

Still deferred after Phase D:

- actual Google Workspace installation
- actual Slack installation
- actual Jira/Confluence installation
- actual Notion installation
- actual ERPNext installation
- MCP/plugin wrapper installation
- runtime connector wiring to those tools
- payment UI

## 10. Acceptance Criteria

Phase D is acceptable when:

1. the topology docs are present
2. the topology registries are present
3. the topology registries validate
4. the local runtime deployment runbook is present
5. a runtime bundle can be dropped locally without a git checkout
