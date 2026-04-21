# Phase D Topology Gap Log v1.0.0

## Current findings

### HOLE-TOPO-001 — external systems are modeled, not installed

Status: OPEN
Type: HOLE

Modeled in topology:

- GitHub
- Jira / Confluence
- Slack
- Google Workspace
- Notion
- ERPNext
- Local LibreOffice

Current repo state:

- topology and data substrate only
- no live connector installation or auth wiring

Reason:
This is intentional and remains deferred.

---

### HOLE-TOPO-002 — vendor network breadth is minimal

Status: OPEN
Type: HOLE

Current phase D topology includes placeholder vendor mailboxes and categories, but only the first approved vendor classes are modeled.

Potential future expansion:

- MRO vendor
- packaging vendor
- IT supplies vendor
- freight vendor

No additional vendor classes were added in this phase.

---

### HOLE-TOPO-003 — CRM / lead lifecycle is still not modeled

Status: OPEN
Type: HOLE

This remains one of the previously identified external-gap items.
It is logged but not implemented in Phase D.

---

### HOLE-TOPO-004 — quotation / pre-order lifecycle is still partial

Status: OPEN
Type: HOLE

Purchase flow and invoice flow are modeled, but an explicit quotation registry and pre-order lifecycle were not added in Phase D.

---

### HOLE-TOPO-005 — quality management is still not modeled

Status: OPEN
Type: HOLE

No QA / NCR / CAPA substrate was added in Phase D.

---

### HOLE-TOPO-006 — inventory valuation to accounting coupling is still partial

Status: OPEN
Type: HOLE

The synthetic accounting objects exist, but explicit valuation-policy surfaces are not yet pinned.

## Closed items in Phase D

### CLEAR-TOPO-001 — normal business topology pinned

Status: CLEAR
Type: CLEAR

The lab now formally models a normal business topology rather than a Nexus-shaped demo environment.

### CLEAR-TOPO-002 — local runtime can be deployed without local git repo

Status: CLEAR
Type: CLEAR

A runtime bundle is produced as an artifact separate from the repo.
