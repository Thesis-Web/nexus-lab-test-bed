# Local Runtime Deployment v1.0.0

This runbook deploys the lab runtime to the big machine **without creating a local git repo**.

## Target paths

Suggested runtime path inside WSL:

- `~/runtime/nexus-lab-test-bed`

Existing local state path on Windows:

- `C:\Users\AdLibitumVita\nexus-lab-test-bed-local`

## Runtime tree contents

The runtime bundle contains:

- compose and SQL init files
- manifests and contracts
- seeds, mutations, scenario packs, and corpus fixtures
- local, seed, and validate scripts
- package metadata needed for local node-based commands

## Local env source

Copy the already-created local env file from:

- `/mnt/c/Users/AdLibitumVita/nexus-lab-test-bed-local/lab.env`

into:

- `infra/env/lab.env`

inside the runtime tree.

## Deploy steps

1. Extract the runtime bundle under `~/runtime/`.
2. Copy the existing local `lab.env` into the runtime tree.
3. Install dependencies with `pnpm install --frozen-lockfile`.
4. Run `pnpm schema:validate`.
5. Run `pnpm lab:up`.
6. Run `pnpm seed:all`.

## Notes

- This is a deployed runtime tree, not a git repo.
- Database state remains outside git in the existing local state path.
- The runtime tree may be replaced wholesale by a newer runtime bundle in later phases.
