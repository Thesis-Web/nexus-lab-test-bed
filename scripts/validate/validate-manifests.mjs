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
  path.join(repoRoot, "packages/contracts/schemas/**/*.json"),
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
    files: [
      path.join(
        repoRoot,
        "lab_data/scenarios/manifests/dell-like-governance-smoke.scenario.json",
      ),
    ],
  },
  {
    schemaId:
      "https://nexus-lab-test-bed.local/schemas/worker-contract.schema.json",
    files: globSync(path.join(repoRoot, "packages/contracts/workers/*.json")),
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
