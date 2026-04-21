# Nexus Lab Fake Company Scope Pack Engineering Spec v1.0.0

## 1. Authority

This spec implements:

- `docs/blueprints/nexus_lab_data_bed_blueprint_v1-0-1-canonical.md`
- `docs/blueprints/nexus_lab_fake_company_scope_pack_v1-0-0-canonical.md`

If this spec conflicts with the blueprint documents, the blueprint documents win.

## 2. Build Objective

Reshape the lab foundation into a synthetic-company-first repo.

The next build phase must prioritize:

- company world-state completeness
- scenario completeness
- fixture completeness
- deterministic time movement

The next build phase must not prioritize:

- generic platform abstractions
- UI work
- cloud deployment
- agent autonomy
- unnecessary runtime engines

## 3. Required New Repo Areas

The following repo areas are required for the next phase:

- `lab_data/company/`
- `lab_data/corpus/`
- `lab_data/mutations/`
- `lab_data/scenarios/packs/`
- `packages/contracts/domain/`

## 4. Required Structured Seed Packs

The next build phase must create seed packs for:

### 4.1 Reference Packs

- company profile
- departments
- actors
- vendors
- customers
- locations
- products
- assets
- chart of accounts

### 4.2 Operational Packs

- inventory positions
- inventory movements
- purchase orders
- receipts
- work orders
- maintenance tickets
- shipments
- sales orders
- invoices
- payments
- journal entries

### 4.3 Coordination Packs

- meetings
- meeting action items
- tasks
- support tickets
- call logs
- research briefs

## 5. Required Filesystem Corpora

The next build phase must create local filesystem corpora roots:

- `lab_data/corpus/docs/`
- `lab_data/corpus/pdfs/`
- `lab_data/corpus/workbooks/`
- `lab_data/corpus/email/`
- `lab_data/corpus/calls/`
- `lab_data/corpus/tickets/`
- `lab_data/corpus/fixtures/`

## 6. Required Mutation Packs

The next build phase must create manifest-driven mutation packs at:

- `lab_data/mutations/hourly/`
- `lab_data/mutations/daily/`
- `lab_data/mutations/weekly/`

Each mutation manifest must declare:

- mutation id
- cadence
- effective timestamp
- source files
- target tables or corpora paths
- deterministic ordering
- replay mode

## 7. Required Scenario Packs

The next build phase must create scenario-pack manifests at:

- `lab_data/scenarios/packs/customer-ops/`
- `lab_data/scenarios/packs/finance/`
- `lab_data/scenarios/packs/logistics/`
- `lab_data/scenarios/packs/production/`
- `lab_data/scenarios/packs/support/`

Each pack must include:

- scenario manifest
- supporting structured seeds
- supporting corpora references
- expected decision assertions

## 8. Required Domain Contracts

Create domain contract schemas under:

- `packages/contracts/domain/company-profile.schema.json`
- `packages/contracts/domain/department.schema.json`
- `packages/contracts/domain/vendor.schema.json`
- `packages/contracts/domain/customer.schema.json`
- `packages/contracts/domain/location.schema.json`
- `packages/contracts/domain/product.schema.json`
- `packages/contracts/domain/asset.schema.json`
- `packages/contracts/domain/chart-of-accounts.schema.json`
- `packages/contracts/domain/inventory-position.schema.json`
- `packages/contracts/domain/purchase-order.schema.json`
- `packages/contracts/domain/receipt.schema.json`
- `packages/contracts/domain/work-order.schema.json`
- `packages/contracts/domain/maintenance-ticket.schema.json`
- `packages/contracts/domain/shipment.schema.json`
- `packages/contracts/domain/sales-order.schema.json`
- `packages/contracts/domain/invoice.schema.json`
- `packages/contracts/domain/payment.schema.json`
- `packages/contracts/domain/journal-entry.schema.json`
- `packages/contracts/domain/meeting.schema.json`
- `packages/contracts/domain/task.schema.json`
- `packages/contracts/domain/support-ticket.schema.json`
- `packages/contracts/domain/call-log.schema.json`
- `packages/contracts/domain/research-brief.schema.json`
- `packages/contracts/domain/mutation-manifest.schema.json`

## 9. Required SQL Expansion

The next schema expansion must add tables for:

- department
- vendor
- asset
- chart_account
- inventory_movement
- purchase_order
- purchase_order_line
- receipt
- receipt_line
- work_order
- work_order_operation
- maintenance_ticket
- shipment_line
- payment
- journal_entry
- journal_entry_line
- support_ticket
- call_log

## 10. Required Seed Loader Expansion

The next seed loader build must support:

- ordered domain loading
- reference resolution by business key
- idempotent upsert by canonical business key
- deterministic load logging

## 11. Required Reset/Replay Controls

The next phase must support:

- full local reset
- reload of canonical seeds
- replay of hourly/daily/weekly mutation packs
- scenario replay against known world states

## 12. Deferred Until After Scope Pack Phase

Explicitly deferred:

- real Gmail integration
- QuickBooks integration
- real phone system integration
- full IAM/RBAC connector
- cloud migration
- public self-hosted GitHub runners
- UI shell
- autonomous worker runtime
