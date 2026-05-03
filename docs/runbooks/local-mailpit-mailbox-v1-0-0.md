# Local Mailpit Mailbox Runbook v1.0.0

## Purpose

LAB-MAIL-001 adds a local SMTP capture substrate for synthetic business email flows.

It is for local lab validation only.

## Boundary

This runbook does not install or configure Gmail, Google Workspace, OAuth, IMAP, external SMTP relay, or live vendor/customer accounts.

It does not promote simulation SQL.

It does not change the canonical future cloud-mail topology. Google Workspace Mail remains the future mailbox system model until an owner-approved connector phase wires it.

## Local Ports

Mailpit is exposed on localhost only:

- Web UI and API: `127.0.0.1:${LAB_MAILPIT_HTTP_PORT}`
- SMTP: `127.0.0.1:${LAB_MAILPIT_SMTP_PORT}`

Default local values:

- Web UI and API: `8025`
- SMTP: `1025`

## State

Mailpit state lives outside git:

- `${LAB_MAILPIT_DATA_HOST_PATH}`

The default generated local path is:

    ~/.local/share/nexus-lab-test-bed/mailpit/data

## Start

From repo root:

    pnpm lab:up

## Smoke Test

From repo root:

    pnpm mail:smoke

Expected result:

    Mailpit smoke test passed.

## Manual UI Check

Open the Mailpit UI locally:

    http://127.0.0.1:8025

The smoke message should be visible with a subject beginning:

    LAB-MAIL-001 smoke

## Stop

From repo root:

    pnpm lab:down

## Deferred

Still deferred:

- real Gmail integration
- Google Workspace OAuth
- IMAP retrieval realism
- external SMTP relay
- vendor/customer real accounts
- runtime connector wiring to Nexus/Vanguard
