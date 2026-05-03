#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_TEMPLATE="${REPO_ROOT}/infra/env/lab.env.example"
ENV_FILE="${REPO_ROOT}/infra/env/lab.env"
LAB_ROOT="${HOME}/.local/share/nexus-lab-test-bed"

mkdir -p "${LAB_ROOT}/postgres/data"
mkdir -p "${LAB_ROOT}/pgadmin"
mkdir -p "${LAB_ROOT}/corpus"
mkdir -p "${LAB_ROOT}/evidence"
mkdir -p "${LAB_ROOT}/mailpit/data"

if [ ! -f "${ENV_FILE}" ]; then
  sed \
    -e "s|/home/REPLACE_ME/.local/share/nexus-lab-test-bed/postgres/data|${LAB_ROOT}/postgres/data|g" \
    -e "s|/home/REPLACE_ME/.local/share/nexus-lab-test-bed/pgadmin|${LAB_ROOT}/pgadmin|g" \
    -e "s|/home/REPLACE_ME/.local/share/nexus-lab-test-bed/corpus|${LAB_ROOT}/corpus|g" \
    -e "s|/home/REPLACE_ME/.local/share/nexus-lab-test-bed/evidence|${LAB_ROOT}/evidence|g" \
    -e "s|/home/REPLACE_ME/.local/share/nexus-lab-test-bed/mailpit/data|${LAB_ROOT}/mailpit/data|g" \
    "${ENV_TEMPLATE}" > "${ENV_FILE}"
fi

ensure_env_value() {
  local key="$1"
  local value="$2"

  if ! grep -q "^${key}=" "${ENV_FILE}"; then
    printf '%s=%s\n' "${key}" "${value}" >> "${ENV_FILE}"
  fi
}

repair_placeholder_value() {
  local key="$1"
  local value="$2"

  if grep -q "^${key}=/home/REPLACE_ME/" "${ENV_FILE}"; then
    sed -i "s|^${key}=.*|${key}=${value}|g" "${ENV_FILE}"
  fi
}

ensure_env_value "LAB_MAILPIT_IMAGE" "axllent/mailpit:v1.29.6"
ensure_env_value "LAB_MAILPIT_SMTP_PORT" "1025"
ensure_env_value "LAB_MAILPIT_HTTP_PORT" "8025"
ensure_env_value "LAB_MAILPIT_DATA_HOST_PATH" "${LAB_ROOT}/mailpit/data"
ensure_env_value "LAB_MAILPIT_MAX_MESSAGES" "5000"

repair_placeholder_value "LAB_PGDATA_HOST_PATH" "${LAB_ROOT}/postgres/data"
repair_placeholder_value "LAB_PGADMIN_HOST_PATH" "${LAB_ROOT}/pgadmin"
repair_placeholder_value "LAB_CORPUS_HOST_PATH" "${LAB_ROOT}/corpus"
repair_placeholder_value "LAB_EVIDENCE_HOST_PATH" "${LAB_ROOT}/evidence"
repair_placeholder_value "LAB_MAILPIT_DATA_HOST_PATH" "${LAB_ROOT}/mailpit/data"

echo "Local lab root:"
echo "  ${LAB_ROOT}"
echo
echo "Edit this file before full run:"
echo "  ${ENV_FILE}"
echo
echo "Set LAB_OLLAMA_BASE_URL to the small laptop Ollama endpoint."
