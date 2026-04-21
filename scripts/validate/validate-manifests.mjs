import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { globSync } from "glob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");

const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
  allowUnionTypes: true,
});
addFormats(ajv);

const schemaFiles = globSync(
  path.join(repoRoot, "packages/contracts/**/*.json"),
);
for (const schemaFile of schemaFiles) {
  const schema = JSON.parse(await readFile(schemaFile, "utf8"));
  if (schema.$id) {
    ajv.addSchema(schema);
  }
}

const validations = [
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/actor-registry.schema.json",
    files: [
      path.join(repoRoot, "lab_data/registries/actors/actors.registry.json"),
    ],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/model-registry.schema.json",
    files: [
      path.join(repoRoot, "lab_data/registries/models/models.registry.json"),
    ],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/policy-registry.schema.json",
    files: [
      path.join(
        repoRoot,
        "lab_data/registries/policies/policies.registry.json",
      ),
    ],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/seed-manifest.schema.json",
    files: globSync(path.join(repoRoot, "lab_data/seeds/manifests/*.json")),
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/scenario-manifest.schema.json",
    files: globSync(
      path.join(repoRoot, "lab_data/scenarios/**/*.scenario.json"),
    ),
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/scenario-pack.schema.json",
    files: globSync(
      path.join(repoRoot, "lab_data/scenarios/**/pack.manifest.json"),
    ),
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/worker-contract.schema.json",
    files: globSync(path.join(repoRoot, "packages/contracts/workers/*.json")),
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/topology-department-registry.schema.json",
    files: [path.join(repoRoot, "lab_data/topology/departments.registry.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/topology-mailbox-registry.schema.json",
    files: [path.join(repoRoot, "lab_data/topology/mailboxes.registry.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/topology-system-registry.schema.json",
    files: [path.join(repoRoot, "lab_data/topology/systems.registry.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/topology-data-zone-registry.schema.json",
    files: [path.join(repoRoot, "lab_data/topology/data-zones.registry.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/topology-ingress-registry.schema.json",
    files: [
      path.join(repoRoot, "lab_data/topology/ingress-points.registry.json"),
    ],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/topology-transactional-chain-registry.schema.json",
    files: [
      path.join(
        repoRoot,
        "lab_data/topology/transactional-chains.registry.json",
      ),
    ],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/company-profile.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/company_profile.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/department.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/departments.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/vendor.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/vendors.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/customer.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/customers.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/location.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/locations.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/product.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/products.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/asset.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/assets.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/chart-of-accounts.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/chart_accounts.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/inventory-position.schema.json",
    files: [
      path.join(repoRoot, "lab_data/seeds/json/inventory_positions.json"),
    ],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/inventory-movement.schema.json",
    files: [
      path.join(repoRoot, "lab_data/seeds/json/inventory_movements.json"),
    ],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/purchase-order.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/purchase_orders.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/purchase-order-line.schema.json",
    files: [
      path.join(repoRoot, "lab_data/seeds/json/purchase_order_lines.json"),
    ],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/receipt.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/receipts.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/receipt-line.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/receipt_lines.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/work-order.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/work_orders.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/work-order-operation.schema.json",
    files: [
      path.join(repoRoot, "lab_data/seeds/json/work_order_operations.json"),
    ],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/maintenance-ticket.schema.json",
    files: [
      path.join(repoRoot, "lab_data/seeds/json/maintenance_tickets.json"),
    ],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/shipment.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/shipments.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/shipment-line.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/shipment_lines.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/sales-order.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/sales_orders.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/sales-order-line.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/sales_order_lines.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/invoice.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/invoices.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/payment.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/payments.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/journal-entry.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/journal_entries.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/journal-entry-line.schema.json",
    files: [
      path.join(repoRoot, "lab_data/seeds/json/journal_entry_lines.json"),
    ],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/meeting.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/meetings.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/meeting-action-item.schema.json",
    files: [
      path.join(repoRoot, "lab_data/seeds/json/meeting_action_items.json"),
    ],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/task.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/tasks.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/support-ticket.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/support_tickets.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/call-log.schema.json",
    files: [path.join(repoRoot, "lab_data/seeds/json/call_logs.json")],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/contracts/domain/mutation-manifest.schema.json",
    files: globSync(
      path.join(repoRoot, "lab_data/mutations/**/*.manifest.json"),
    ),
  },
];

let failures = 0;

for (const validation of validations) {
  const validate = ajv.getSchema(validation.schemaId);
  if (!validate) {
    console.error(`Missing validator for schema: ${validation.schemaId}`);
    failures += 1;
    continue;
  }

  for (const file of validation.files) {
    const payload = JSON.parse(await readFile(file, "utf8"));
    const ok = validate(payload);
    if (!ok) {
      failures += 1;
      console.error(`Validation failed: ${path.relative(repoRoot, file)}`);
      console.error(JSON.stringify(validate.errors, null, 2));
    } else {
      console.log(`OK  ${path.relative(repoRoot, file)}`);
    }
  }
}

if (failures > 0) {
  process.exit(1);
}
