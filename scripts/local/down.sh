#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${REPO_ROOT}/infra/env/lab.env"
COMPOSE_FILE="${REPO_ROOT}/infra/compose/docker-compose.yml"

cd "${REPO_ROOT}"
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" down
cd "${REPO_ROOT}"
