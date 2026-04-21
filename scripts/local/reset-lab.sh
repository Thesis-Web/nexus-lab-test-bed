#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${REPO_ROOT}/infra/env/lab.env"
COMPOSE_FILE="${REPO_ROOT}/infra/compose/docker-compose.yml"

cd "${REPO_ROOT}"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Missing env file: ${ENV_FILE}"
  exit 1
fi

set -a
source "${ENV_FILE}"
set +a

if [[ -z "${LAB_PGDATA_HOST_PATH:-}" ]]; then
  echo "LAB_PGDATA_HOST_PATH is not set."
  exit 1
fi

docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" down

rm -rf "${LAB_PGDATA_HOST_PATH}"
mkdir -p "${LAB_PGDATA_HOST_PATH}"

docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" up -d

echo "Lab database path reset:"
echo "  ${LAB_PGDATA_HOST_PATH}"

cd "${REPO_ROOT}"
