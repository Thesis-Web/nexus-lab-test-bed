# Open Enterprise Simulation Map v1.0.0

## Purpose

This document maps external enterprise simulation and open ERP references against the `nexus-lab-test-bed` fake-company target.

It is used only for reference coverage and gap detection.
It is not a license grant, product dependency, or code-import approval.

## Source Classes Reviewed

### ERP Teaching / Simulation

- ERPsim / HEC Montréal
- university ERP simulation usage references

### Sample Business Databases

- Microsoft Wide World Importers
- Microsoft AdventureWorks

### Open ERP / Modular Business Suites

- Odoo Community
- ERPNext
- Tryton
- Dolibarr

## What We Reuse Conceptually

### ERPsim

Use as reference for:

- continuous business simulation
- planning / procurement / production / sales / distribution / accounting loops
- scenario-based business pressure

Do not reuse as code base.

### Wide World Importers / AdventureWorks

Use as reference for:

- realistic fictitious-company naming
- sample business workflows
- baseline operational data patterns

Do not copy schema wholesale.

### Odoo Community

Use as reference for:

- manufacturing
- inventory / warehouse
- purchase
- maintenance
- inventory valuation linkage to accounting
- modular business coverage

### ERPNext

Use as reference for:

- integrated small manufacturer coverage
- buying / selling / stock / manufacturing coupling
- CRM / email-thread style business context

### Tryton

Use as reference for:

- modular accounting / sales / purchase / production / quality model surfaces
- clean operational/financial module separation

### Dolibarr

Use as reference for:

- practical SMB breadth
- product / vendor / finance / CRM module coverage
- simple modularity

## Canonical Result for This Repo

The repo remains:

- synthetic-company-first
- local-first
- deterministic
- schema-driven
- bounded-worker-only

The repo does **not** become:

- a fork of an ERP
- an SAP simulator
- a dependent integration to a teaching platform

## Coverage Confirmed by Mapping

The external references confirm that the current fake-company target is directionally correct for these surfaces:

- procurement
- inventory
- production
- shipping / distribution
- accounting
- maintenance
- customer-facing flows
- support / service context
- scenario-driven business change

## Gap Review Rule

Any new surface suggested by these references but not already approved for the lab must be logged as a gap for owner approval before build inclusion.
