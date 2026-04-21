# Open Enterprise Simulation Gap Log v1.0.0

## Authority

This log records gaps identified while reviewing ERP teaching/simulation references and open ERP module coverage.
Open items are not approved build scope until owner ratifies them.

## Findings

### HOLE-003 — Quality management surface not yet explicit

Status: OPEN
Type: HOLE

Observed from references:

- manufacturing-oriented systems commonly include quality events, quality checks, and issue escalation.

Current repo state:

- production and maintenance are in approved scope
- explicit quality domain and quality-event artifacts are not yet pinned

Owner decision needed:

- add `quality_incident` / `quality_check` surfaces later, or defer

---

### HOLE-004 — Quotation / pre-order lifecycle not yet explicit

Status: OPEN
Type: HOLE

Observed from references:

- sales and purchasing flows commonly begin before order issue with quotations, tenders, or agreements.

Current repo state:

- approved scope begins at purchase orders / sales orders
- quote/tender lifecycle is not explicit

Owner decision needed:

- keep v1 order-centric, or extend later with quote/agreement surfaces

---

### HOLE-005 — Inventory valuation to accounting linkage not yet explicit

Status: OPEN
Type: HOLE

Observed from references:

- integrated enterprise systems commonly tie stock valuation movements to accounting effects.

Current repo state:

- accounting-lite is in scope
- inventory and journal entries are present in approved scope
- valuation coupling is not explicit as a rule

Owner decision needed:

- add explicit valuation linkage rules later, or keep it manual in v1

---

### HOLE-006 — CRM / lead lifecycle not yet explicit

Status: OPEN
Type: HOLE

Observed from references:

- open ERP suites commonly include lead/opportunity/customer lifecycle surfaces.

Current repo state:

- customer directory, sales orders, support, and account briefing are in scope
- pre-customer lead/opportunity lifecycle is not explicit

Owner decision needed:

- defer CRM lead lifecycle until later unless sales-pipeline testing requires it

## Contra Review

No contradiction found between these findings and the current approved scope pack.
These are completeness holes only.

## Best-Solve

Proceed with phase C build exactly against already approved scope.
Do not include HOLE-003 through HOLE-006 in schema or seeds yet.
