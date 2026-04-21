# Nexus Lab Fake Company Scope Pack v1.0.0 Canonical

## 1. Authority

This scope pack refines the lab target for `nexus-lab-test-bed`.

The lab is a **synthetic company sandbox** used to test:

- Vanguard = inference firewall and routing plane
- Nexus = governance and execution plane

The lab is **not** a production ERP, CRM, IAM, or autonomous agent platform.

## 2. Governing Intent

Build the realest fake company sandbox possible while preserving:

- local-first runtime
- deterministic replay
- resettable state
- explicit contracts
- bounded workers only
- no drift into full enterprise product build

## 3. Scope Identity

The synthetic company is a living business world-state with:

- structured operational records
- unstructured business artifacts
- actor and authority definitions
- policy surfaces
- scenario packs
- scheduled synthetic mutation

It exists to let Nexus and Vanguard operate against believable business conditions.

## 4. What v1 Is

v1 is:

- a seeded synthetic company
- with realistic departments and records
- with believable documents and fixtures
- with deterministic daily/weekly/hourly change packs
- with policy and authority surfaces
- with scenario manifests tied to business events

## 5. What v1 Is Not

v1 is not:

- a full ERP product
- a full CRM product
- a full IAM/RBAC integration layer
- a UI platform
- a BPM engine
- a cloud SaaS dependency
- an autonomous multi-agent system

## 6. Canonical Company Surface Areas

### 6.1 Core Company Identity

The lab company must include:

- company profile
- departments
- locations
- staff directory
- vendor directory
- customer directory

### 6.2 Business Operations

The lab company must include:

- product management
- inventory management
- purchasing
- receiving
- production management
- maintenance management
- shipping and fulfillment
- sales orders
- invoicing
- payments
- bookkeeping-lite

### 6.3 Coordination and Communications

The lab company must include:

- meetings
- action items
- tasks
- email-like fixtures
- call transcript fixtures
- support ticket fixtures
- research briefs
- workbooks
- PDF artifacts
- markdown docs

### 6.4 Governance/Test Surfaces

The lab must include:

- actor registry
- model registry
- policy registry
- scenario manifests
- world-state mutation manifests
- evidence output contracts

## 7. Canonical Business Departments

The first fake company must model these departments:

- executive
- operations
- sales
- finance
- purchasing
- production
- maintenance
- engineering
- customer support
- logistics

## 8. Canonical Actor Classes

The first fake company must model these actor classes:

- owner
- executive-assistant
- ops-manager
- inventory-manager
- purchasing-agent
- receiving-clerk
- production-coordinator
- maintenance-lead
- shipping-coordinator
- sales-lead
- account-rep
- finance-lead
- staff-accountant
- engineer
- support-lead
- analyst
- service-vanguard
- service-nexus
- worker-file-intake-v1
- worker-scenario-runner-v1

## 9. Canonical Structured Data Domains

v1 must include these structured domains.

### 9.1 Reference Domains

- company_profile
- department
- location
- actor
- vendor
- customer
- product
- asset
- chart_of_accounts

### 9.2 Transaction Domains

- inventory_position
- inventory_movement
- purchase_order
- purchase_order_line
- receipt
- receipt_line
- work_order
- work_order_operation
- maintenance_ticket
- shipment
- shipment_line
- sales_order
- sales_order_line
- invoice
- payment
- journal_entry
- journal_entry_line

### 9.3 Coordination Domains

- meeting
- meeting_action_item
- task
- support_ticket
- call_log
- research_brief

## 10. Canonical Unstructured Artifact Domains

v1 must include filesystem fixture corpora for:

- policies
- SOPs
- work instructions
- customer emails
- vendor emails
- complaint threads
- meeting notes
- call transcripts
- invoices as PDFs
- packing slips as PDFs
- spreadsheet workbooks
- engineering notes
- maintenance logs
- support summaries

## 11. Canonical Time-Movement Model

The company must not remain static.

v1 introduces deterministic movement packs:

### 11.1 Hourly Mutations

- inbound customer messages
- ticket status changes
- shipment status updates

### 11.2 Daily Mutations

- inventory movements
- receipts
- work-order progress
- sales order changes
- invoice generation
- payment posting

### 11.3 Weekly Mutations

- meetings
- forecast workbook refresh
- maintenance backlog rollup
- finance close-lite snapshot
- vendor performance update

## 12. Determinism Law

Time movement must be deterministic.

Mutation packs must be:

- declared by manifest
- timestamped
- replayable
- resettable
- versioned
- auditable

No uncontrolled randomness is permitted in v1.

## 13. v1 Scenario Families

The first scenario families are:

- customer complaint triage
- shipping delay escalation
- purchase shortfall response
- constrained inventory allocation
- production reschedule
- maintenance outage handling
- invoice discrepancy review
- meeting to action-item generation
- sales account briefing
- support case summarization

## 14. Minimal Identity/Authority Model

Do not build full IAM/RBAC integration in v1.

Use a local synthetic authority model with:

- actor id
- actor class
- department
- authority ceiling
- approval rights
- execution ceiling
- data access ceiling
- environment binding
- enabled state

This model exists only to support realistic governance tests.

## 15. v1 Non-Negotiable Boundaries

- runtime local
- state local
- database outside git
- filesystem corpora local
- no public self-hosted runner dependency
- no live enterprise SaaS dependency
- no autonomous open-ended agents
- no fake-company UI requirement in v1

## 16. Repo Shape Implications

The repo must now explicitly include:

- domain seeds
- mutation manifests
- corpora manifests
- scenario packs
- accounting-lite seeds
- purchasing/receiving seeds
- production/maintenance seeds
- shipping/fulfillment seeds

## 17. v1 Exit Condition

v1 fake company scope is satisfied when the repo can represent:

- a believable company world-state
- a believable document corpus
- a believable authority structure
- believable operational change over time
- deterministic scenario replay for Nexus and Vanguard testing
