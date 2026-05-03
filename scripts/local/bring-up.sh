#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${REPO_ROOT}/infra/env/lab.env"
COMPOSE_FILE="${REPO_ROOT}/infra/compose/docker-compose.yml"

cd "${REPO_ROOT}"
bash "${REPO_ROOT}/scripts/local/init-host-paths.sh"

set -a
source "${ENV_FILE}"
set +a

docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" up -d

until docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T postgres   pg_isready -U "${LAB_POSTGRES_USER}" -d "${LAB_POSTGRES_DB}" >/dev/null 2>&1; do
  sleep 2
done

echo "Postgres is healthy."
echo "Mailpit UI/API:"
echo "  http://127.0.0.1:${LAB_MAILPIT_HTTP_PORT}"
echo "Mailpit SMTP:"
echo "  127.0.0.1:${LAB_MAILPIT_SMTP_PORT}"
cd "${REPO_ROOT}"
