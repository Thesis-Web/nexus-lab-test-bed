#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { globSync } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

function sortedFiles(pattern) {
  return globSync(pattern, { nodir: true }).sort((a, b) => a.localeCompare(b));
}

async function loadJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

const schemaDirs = [
  path.join(repoRoot, "packages", "contracts", "schemas"),
  path.join(repoRoot, "packages", "contracts", "domain"),
];

for (const schemaDir of schemaDirs) {
  for (const file of sortedFiles(path.join(schemaDir, "*.json"))) {
    const schema = await loadJson(file);
    if (schema && schema.$id && !ajv.getSchema(schema.$id)) {
      ajv.addSchema(schema);
    }
  }
}

const compiled = new Map();

async function getValidator(schemaPath) {
  const key = path.resolve(schemaPath);
  if (compiled.has(key)) return compiled.get(key);

  const schema = await loadJson(key);

  let validate = null;
  if (schema && schema.$id) {
    validate = ajv.getSchema(schema.$id) ?? null;
  }

  if (!validate) {
    validate = ajv.compile(schema);
  }

  compiled.set(key, validate);
  return validate;
}

const validations = [
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "actor-registry.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "registries",
        "actors",
        "actors.registry.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "model-registry.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "registries",
        "models",
        "models.registry.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "policy-registry.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "registries",
        "policies",
        "policies.registry.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "seed-manifest.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "seeds",
        "manifests",
        "registry.seed.manifest.json",
      ),
      path.join(
        repoRoot,
        "lab_data",
        "seeds",
        "manifests",
        "domain.seed.manifest.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "scenario-manifest.schema.json",
    ),
    files: [
      ...sortedFiles(
        path.join(repoRoot, "lab_data", "scenarios", "manifests", "*.json"),
      ),
      ...sortedFiles(
        path.join(
          repoRoot,
          "lab_data",
          "scenarios",
          "packs",
          "*",
          "*.scenario.json",
        ),
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "scenario-pack.schema.json",
    ),
    files: sortedFiles(
      path.join(
        repoRoot,
        "lab_data",
        "scenarios",
        "packs",
        "*",
        "pack.manifest.json",
      ),
    ),
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "worker-contract.schema.json",
    ),
    files: sortedFiles(
      path.join(repoRoot, "packages", "contracts", "workers", "*.json"),
    ),
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "topology-department-registry.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "topology", "departments.registry.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "topology-mailbox-registry.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "topology", "mailboxes.registry.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "topology-system-registry.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "topology", "systems.registry.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "topology-data-zone-registry.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "topology", "data-zones.registry.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "topology-ingress-registry.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "topology",
        "ingress-points.registry.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "topology-transactional-chain-registry.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "topology",
        "transactional-chains.registry.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "simulation-clock-registry.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "simulation", "clock.registry.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "simulation-growth-stage-registry.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "simulation",
        "growth-stages.registry.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "simulation-event-generator-registry.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "simulation",
        "event-generators.registry.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "simulation-control-mode-registry.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "simulation",
        "control-modes.registry.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "simulation-facility-lifecycle-registry.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "simulation",
        "facility-lifecycle.registry.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "simulation-workforce-lifecycle-registry.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "simulation",
        "workforce-lifecycle.registry.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "schemas",
      "simulation-asset-expansion-registry.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "simulation",
        "asset-expansion.registry.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "company-profile.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "seeds", "json", "company_profile.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "department.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "seeds", "json", "departments.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "vendor.schema.json",
    ),
    files: [path.join(repoRoot, "lab_data", "seeds", "json", "vendors.json")],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "customer.schema.json",
    ),
    files: [path.join(repoRoot, "lab_data", "seeds", "json", "customers.json")],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "location.schema.json",
    ),
    files: [path.join(repoRoot, "lab_data", "seeds", "json", "locations.json")],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "product.schema.json",
    ),
    files: [path.join(repoRoot, "lab_data", "seeds", "json", "products.json")],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "asset.schema.json",
    ),
    files: [path.join(repoRoot, "lab_data", "seeds", "json", "assets.json")],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "chart-of-accounts.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "seeds", "json", "chart_accounts.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "inventory-position.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "seeds",
        "json",
        "inventory_positions.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "inventory-movement.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "seeds",
        "json",
        "inventory_movements.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "purchase-order.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "seeds", "json", "purchase_orders.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "purchase-order-line.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "seeds",
        "json",
        "purchase_order_lines.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "receipt.schema.json",
    ),
    files: [path.join(repoRoot, "lab_data", "seeds", "json", "receipts.json")],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "receipt-line.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "seeds", "json", "receipt_lines.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "work-order.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "seeds", "json", "work_orders.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "work-order-operation.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "seeds",
        "json",
        "work_order_operations.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "maintenance-ticket.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "seeds",
        "json",
        "maintenance_tickets.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "shipment.schema.json",
    ),
    files: [path.join(repoRoot, "lab_data", "seeds", "json", "shipments.json")],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "shipment-line.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "seeds", "json", "shipment_lines.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "sales-order.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "seeds", "json", "sales_orders.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "sales-order-line.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "seeds",
        "json",
        "sales_order_lines.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "invoice.schema.json",
    ),
    files: [path.join(repoRoot, "lab_data", "seeds", "json", "invoices.json")],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "payment.schema.json",
    ),
    files: [path.join(repoRoot, "lab_data", "seeds", "json", "payments.json")],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "journal-entry.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "seeds", "json", "journal_entries.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "journal-entry-line.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "seeds",
        "json",
        "journal_entry_lines.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "meeting.schema.json",
    ),
    files: [path.join(repoRoot, "lab_data", "seeds", "json", "meetings.json")],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "meeting-action-item.schema.json",
    ),
    files: [
      path.join(
        repoRoot,
        "lab_data",
        "seeds",
        "json",
        "meeting_action_items.json",
      ),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "task.schema.json",
    ),
    files: [path.join(repoRoot, "lab_data", "seeds", "json", "tasks.json")],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "support-ticket.schema.json",
    ),
    files: [
      path.join(repoRoot, "lab_data", "seeds", "json", "support_tickets.json"),
    ],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "call-log.schema.json",
    ),
    files: [path.join(repoRoot, "lab_data", "seeds", "json", "call_logs.json")],
  },
  {
    schemaPath: path.join(
      repoRoot,
      "packages",
      "contracts",
      "domain",
      "mutation-manifest.schema.json",
    ),
    files: sortedFiles(
      path.join(repoRoot, "lab_data", "mutations", "**", "*.manifest.json"),
    ),
  },
];

let failures = 0;

for (const entry of validations) {
  const validate = await getValidator(entry.schemaPath);
  for (const file of entry.files) {
    const payload = await loadJson(file);
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

function fail(message) {
  failures += 1;
  console.error(`Semantic validation failed: ${message}`);
}

function uniqueStrings(values, label) {
  if (new Set(values).size !== values.length) {
    fail(`${label} contains duplicates`);
  }
}

const clock = await loadJson(
  path.join(repoRoot, "lab_data", "simulation", "clock.registry.json"),
);
const growth = await loadJson(
  path.join(repoRoot, "lab_data", "simulation", "growth-stages.registry.json"),
);
const generators = await loadJson(
  path.join(
    repoRoot,
    "lab_data",
    "simulation",
    "event-generators.registry.json",
  ),
);
const control = await loadJson(
  path.join(repoRoot, "lab_data", "simulation", "control-modes.registry.json"),
);
const facility = await loadJson(
  path.join(
    repoRoot,
    "lab_data",
    "simulation",
    "facility-lifecycle.registry.json",
  ),
);

const stageIds = growth.stages.map((s) => s.stage_id);
const tickIds = clock.tick_profiles.map((t) => t.tick_id);
const generatorIds = generators.generators.map((g) => g.generator_id);
const controlModeIds = control.modes.map((m) => m.mode_id);

uniqueStrings(stageIds, "growth stage ids");
uniqueStrings(tickIds, "clock tick ids");
uniqueStrings(generatorIds, "event generator ids");
uniqueStrings(controlModeIds, "control mode ids");

const stageSet = new Set(stageIds);
const tickSet = new Set(tickIds);
const multiplierKeys = Object.keys(clock.stage_cadence_multipliers).sort();
const facilityStageKeys = Object.keys(facility.stage_applicability).sort();
const sortedStageIds = [...stageIds].sort();

if (JSON.stringify(multiplierKeys) !== JSON.stringify(sortedStageIds)) {
  fail("stage_cadence_multipliers keys do not match growth stage ids");
}

if (JSON.stringify(facilityStageKeys) !== JSON.stringify(sortedStageIds)) {
  fail("facility stage applicability keys do not match growth stage ids");
}

for (const generator of generators.generators) {
  for (const stageId of generator.supported_stages) {
    if (!stageSet.has(stageId)) {
      fail(
        `generator ${generator.generator_id} references unknown stage ${stageId}`,
      );
    }
  }
  if (!tickSet.has(generator.default_cadence)) {
    fail(
      `generator ${generator.generator_id} references unknown cadence ${generator.default_cadence}`,
    );
  }
}

if (failures > 0) process.exit(1);
