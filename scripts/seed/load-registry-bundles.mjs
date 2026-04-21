import "node:process";
import path from "node:path";

import {
  createClient,
  readJson,
  repoRoot,
  sha256OfFile,
  withSeedHistory,
} from "./_common.mjs";

const manifestPath = "lab_data/seeds/manifests/registry.seed.manifest.json";
const manifest = await readJson(manifestPath);

const client = await createClient();

try {
  await withSeedHistory(
    client,
    manifest.manifest_id,
    manifest.version,
    async () => {
      const loaded = [];
      for (const seed of manifest.seeds) {
        const sourcePath = seed.source_path;
        const payload = await readJson(sourcePath);
        const version = payload.version;
        const registryId = payload.registry_id ?? payload.scenario_id;
        const bundleType = sourcePath.includes("/actors/")
          ? "actors"
          : sourcePath.includes("/models/")
            ? "models"
            : sourcePath.includes("/policies/")
              ? "policies"
              : "scenario";
        const sha = await sha256OfFile(sourcePath);

        await client.query(
          `INSERT INTO registry_bundle (bundle_type, registry_id, version, source_path, sha256_hex, content)
         VALUES ($1, $2, $3, $4, $5, $6::jsonb)
         ON CONFLICT (bundle_type, registry_id, version)
         DO UPDATE SET
           source_path = EXCLUDED.source_path,
           sha256_hex = EXCLUDED.sha256_hex,
           content = EXCLUDED.content,
           inserted_at = NOW()`,
          [
            bundleType,
            registryId,
            version,
            sourcePath,
            sha,
            JSON.stringify(payload),
          ],
        );
        loaded.push({ bundleType, registryId, version });
      }
      return { loaded };
    },
  );
  console.log("Registry bundles loaded.");
} finally {
  await client.end();
}
