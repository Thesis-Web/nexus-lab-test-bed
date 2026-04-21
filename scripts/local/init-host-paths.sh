#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_TEMPLATE="${REPO_ROOT}/infra/env/lab.env.example"
ENV_FILE="${REPO_ROOT}/infra/env/lab.env"
LAB_ROOT="${HOME}/.local/share/nexus-lab-test-bed"

mkdir -p "${LAB_ROOT}/postgres/data"
mkdir -p "${LAB_ROOT}/pgadmin"
mkdir -p "${LAB_ROOT}/corpus/docs"
mkdir -p "${LAB_ROOT}/corpus/pdfs"
mkdir -p "${LAB_ROOT}/corpus/workbooks"
mkdir -p "${LAB_ROOT}/corpus/fixtures"
mkdir -p "${LAB_ROOT}/evidence"

if [[ ! -f "${ENV_FILE}" ]]; then
  sed     -e "s|/home/REPLACE_ME/.local/share/nexus-lab-test-bed/postgres/data|${LAB_ROOT}/postgres/data|g"     -e "s|/home/REPLACE_ME/.local/share/nexus-lab-test-bed/pgadmin|${LAB_ROOT}/pgadmin|g"     -e "s|/home/REPLACE_ME/.local/share/nexus-lab-test-bed/corpus|${LAB_ROOT}/corpus|g"     -e "s|/home/REPLACE_ME/.local/share/nexus-lab-test-bed/evidence|${LAB_ROOT}/evidence|g"     "${ENV_TEMPLATE}" > "${ENV_FILE}"
fi

echo "Local lab root:"
echo "  ${LAB_ROOT}"
echo
echo "Edit this file before full run:"
echo "  ${ENV_FILE}"
echo
echo "Set LAB_OLLAMA_BASE_URL to the small laptop Ollama endpoint."
