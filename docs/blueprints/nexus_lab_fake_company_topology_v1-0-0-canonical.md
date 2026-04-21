# Nexus Lab Fake Company Topology v1.0.0 Canonical

## 1. Authority

This blueprint refines the synthetic-company substrate for `nexus-lab-test-bed`.

It implements the already approved fake-company scope and pins the **normal-business topology** the lab must emulate.

This topology is intentionally **not Nexus-shaped**.
It is a normal mixed-system business environment that Nexus and Vanguard must adapt to.

## 2. Governing Intent

The lab must feel like a believable mid-market / enterprise-adjacent operating environment with:

- multiple systems of work
- mixed cloud and local lanes
- overlapping sources of truth
- real channels
- fake money
- deterministic world state
- deterministic replay

## 3. Topology Law

The lab topology is split into five layers:

1. people and departments
2. systems and channels
3. data zones
4. ingress points
5. transactional chains

All five layers must be represented in canonical machine-readable registries.

## 4. People and Department Layer

The lab company operates with these canonical departments:

- Executive
- Operations
- Sales
- Finance
- Purchasing
- Production
- Maintenance
- Engineering
- Customer Support
- Logistics

The department layer is business-native and exists independently of Nexus.

## 5. Systems Layer

The canonical v1 systems stack is:

- GitHub
- Jira
- Confluence
- Slack
- Google Workspace Mail
- Google Workspace Calendar
- Google Workspace Drive
- Google Workspace Docs
- Google Workspace Sheets
- Notion
- ERPNext
- Local LibreOffice
- Local Restricted Files
- Postgres Lab Database

These systems are selected because they are normal enough to model ordinary business practice while remaining workable inside the lab.

## 6. Local / Cloud Split

### 6.1 Cloud Collaboration Lane

Use the cloud collaboration lane for:

- general email
- meetings
- shared docs
- shared sheets
- chat
- tickets
- repo workflow
- non-sensitive summaries

### 6.2 Local Restricted Lane

Use the local restricted lane for:

- sensitive workbooks
- restricted calculations
- local-only document templates
- local-only staging files
- local-only exports

The local restricted lane is modeled primarily through LibreOffice and local filesystem paths.

### 6.3 System-of-Record Lane

Use the system-of-record lane for:

- ERP-like operating records
- inventory state
- purchasing state
- shipment state
- invoice state
- payment state
- scenario state
- evidence state

## 7. Ingress Point Law

The company must not be modeled as a single clean intake path.

Canonical ingress points are:

- vendor email inbox
- Slack operations chatter
- Jira ticket intake
- calendar meetings
- shared sheet forecast updates
- ERP stock alerts
- local workbook adjustments
- GitHub issues/actions
- policy / SOP document changes

These ingress points represent normal business practice and create realistic routing pressure.

## 8. Transactional Chain Law

The first canonical transactional chains are:

- office supplies purchase
- parts reorder
- vendor invoice processing
- inventory shortage response
- meeting to ticket conversion
- approval escalation

These chains are the minimum believable substrate for governance testing.

## 9. Real Channels / Fake Money Law

The lab uses real-looking channels and synthetic transactions.

Real-looking channels:

- email threads
- chat channels
- meetings
- docs
- spreadsheets
- tickets
- ERP objects

Synthetic transactions:

- requisitions
- quotes
- purchase orders
- receipts
- invoices
- payment scheduling
- payment posting
- shipment notices
- stock movements
- approval decisions

No real payment rails are required in v1.

## 10. Vendor Network Law

The topology must include a fake vendor network with canonical placeholder identities.

The initial network must include at least:

- office supplies vendor
- parts vendor
- coffee / breakroom vendor

Each vendor identity must support:

- quote-like messages
- invoice-like messages
- shipment notice-like messages

## 11. Normal Business Practice Law

The lab must preserve ordinary business disorder, including:

- multiple overlapping systems
- mixed local and cloud work
- partial approvals through chat/email/tickets
- duplicated context across tools
- attachments and spreadsheets outside the system of record

This is required because Nexus is meant to plug into normal business practice rather than a purpose-built demo environment.

## 12. Machine-Readable Topology Surface

The repo must carry these canonical registries:

- department registry
- mailbox / alias registry
- system registry
- data-zone registry
- ingress-point registry
- transactional-chain registry

## 13. Local Runtime Deployment Law

A local runtime deployment bundle is required.

It is not a git repo.

It is a materialized runtime tree containing the files required to:

- bring up Docker Compose locally
- initialize schema locally
- validate manifests locally
- seed the synthetic company locally
- replay mutation packs locally

## 14. Boundaries

This phase does not add:

- real SaaS connector installs
- plugin or MCP wrapper installs
- Nexus runtime changes
- Vanguard runtime changes
- payment website UI
- IAM/RBAC connector implementation

## 15. Exit Condition

Phase D is complete when:

- the topology is pinned in docs
- the topology registries exist and validate
- the local runtime bundle exists
- the repo remains cleanly separable from operator-shell work
