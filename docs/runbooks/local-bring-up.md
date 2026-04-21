# Local Bring-Up

## Host Roles

### Big Machine

Runs the repo, Docker Compose, Postgres, seed loaders, corpus, evidence, and future bounded workers.

### Small Laptop

Runs Ollama only.

### Droplet

Holds the repo for Git operations only. No runtime state belongs there.

## First-Time Flow

From repo root:

```bash
pnpm install
bash scripts/local/init-host-paths.sh
```

Edit:

- `infra/env/lab.env`

Set:

- `LAB_OLLAMA_BASE_URL=http://<small-laptop-ip>:11434`

## Start the Stack

```bash
bash scripts/local/bring-up.sh
```

## Validate Contracts

```bash
pnpm schema:validate
```

## Load Registries

```bash
pnpm seed:registries
```

## Load Domain Seeds

```bash
pnpm seed:domain
```

## Stop the Stack

```bash
bash scripts/local/down.sh
```
