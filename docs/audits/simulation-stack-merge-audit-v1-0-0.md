# Simulation Stack Merge Audit v1.0.0

## Scope

Docs-only partial merge audit and merge pack for the substrate/simulation stack.

## Top Law Kept Unchanged

The following remain unchanged and authoritative:

- `docs/blueprints/nexus_lab_continuous_company_simulation_v1-0-0-canonical.md`
- `docs/engineering-specs/nexus_lab_continuous_company_simulation_v1-0-0-engineering-spec.md`

## Merge Targets Created

- `docs/engineering-specs/nexus_lab_simulation_runtime_planning_v1-0-0.md`
- `docs/engineering-specs/nexus_lab_simulation_sql_stack_planning_v1-0-0.md`
- `docs/runbooks/simulation-runtime-control-surfaces-v1-0-0.md`
- `docs/runbooks/simulation-sql-lifecycle-ops-v1-0-0.md`
- `docs/audits/simulation-stack-merge-audit-v1-0-0.md`

## Merge Judgment

A partial merge is appropriate now.

### Why merge

- runner/state/persistence planning had become one continuous control-plane story
- SQL/DDL/draft/promotion/classification planning had become one continuous SQL lifecycle story
- no hard contra was found, but duplication and fragmentation were high

### Why not full collapse into top law

- the canonical continuous-simulation blueprint/spec should remain concise governing law
- serialized implementation planning should remain below top law as merged active planning docs

## Retained Evidence

Keep all predecessor phase gap logs and predecessor planning docs as retained audit evidence until explicit archival/supersession is approved.

## Boundary Confirmation

This merge pack is docs-only and must not:

- touch implementation surfaces
- touch SQL init surfaces
- touch runtime code
- touch AI-control roots
