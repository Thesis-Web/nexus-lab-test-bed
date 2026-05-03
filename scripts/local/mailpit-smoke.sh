#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${REPO_ROOT}/infra/env/lab.env"

cd "${REPO_ROOT}"

bash "${REPO_ROOT}/scripts/local/init-host-paths.sh" >/dev/null

set -a
source "${ENV_FILE}"
set +a

export LAB_MAILPIT_SMOKE_SUBJECT="LAB-MAIL-001 smoke $(date -u +%Y%m%dT%H%M%SZ)"

python3 - <<'PY'
import json
import os
import smtplib
import sys
import time
import urllib.error
import urllib.request
from email.message import EmailMessage

smtp_host = "127.0.0.1"
smtp_port = int(os.environ["LAB_MAILPIT_SMTP_PORT"])
http_port = int(os.environ["LAB_MAILPIT_HTTP_PORT"])
subject = os.environ["LAB_MAILPIT_SMOKE_SUBJECT"]

sender = "notifications@nexlabco.test"
recipient = "support@nexlabco.test"

message = EmailMessage()
message["From"] = sender
message["To"] = recipient
message["Subject"] = subject
message["X-Nexus-Lab-Test"] = "LAB-MAIL-001"
message.set_content(
    "LAB-MAIL-001 local Mailpit smoke message. "
    "This message must remain inside the local SMTP sink."
)

try:
    with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as smtp:
        smtp.send_message(message)
except OSError as exc:
    raise SystemExit(
        f"Mailpit SMTP is not reachable at {smtp_host}:{smtp_port}. "
        "Run pnpm lab:up and retry. "
        f"Original error: {exc}"
    )

api_url = f"http://127.0.0.1:{http_port}/api/v1/messages"

last_payload = None
for _ in range(30):
    try:
        with urllib.request.urlopen(api_url, timeout=10) as response:
            last_payload = json.loads(response.read().decode("utf-8"))
    except (OSError, urllib.error.URLError) as exc:
        time.sleep(1)
        continue

    messages = last_payload.get("messages") or last_payload.get("Messages") or []

    for item in messages:
        item_subject = item.get("Subject") or item.get("subject")
        if item_subject != subject:
            continue

        print("Mailpit smoke test passed.")
        print(f"  subject: {subject}")
        print(f"  from: {sender}")
        print(f"  to: {recipient}")
        print(f"  api: {api_url}")
        sys.exit(0)

    time.sleep(1)

print("Mailpit smoke test failed: message was not visible through the API.")
print("Expected subject:")
print(f"  {subject}")
print("Last API payload:")
print(json.dumps(last_payload, indent=2, sort_keys=True))
sys.exit(1)
PY

cd "${REPO_ROOT}"
