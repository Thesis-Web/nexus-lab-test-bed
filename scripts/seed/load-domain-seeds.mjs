import { createClient, readJson, withSeedHistory } from "./_common.mjs";

const manifestPath = "lab_data/seeds/manifests/domain.seed.manifest.json";
const manifest = await readJson(manifestPath);

const client = await createClient();

async function upsertLocations(rows) {
  for (const row of rows) {
    await client.query(
      `INSERT INTO locations (
         code, name, description, address_line1, address_line2, city, state, postal_code, country,
         latitude, longitude, location_type, is_active
       ) VALUES (
         $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
       )
       ON CONFLICT (code)
       DO UPDATE SET
         name = EXCLUDED.name,
         description = EXCLUDED.description,
         address_line1 = EXCLUDED.address_line1,
         address_line2 = EXCLUDED.address_line2,
         city = EXCLUDED.city,
         state = EXCLUDED.state,
         postal_code = EXCLUDED.postal_code,
         country = EXCLUDED.country,
         latitude = EXCLUDED.latitude,
         longitude = EXCLUDED.longitude,
         location_type = EXCLUDED.location_type,
         is_active = EXCLUDED.is_active,
         updated_at = NOW()`,
      [
        row.code,
        row.name,
        row.description,
        row.address_line1,
        row.address_line2,
        row.city,
        row.state,
        row.postal_code,
        row.country,
        row.latitude,
        row.longitude,
        row.location_type,
        row.is_active,
      ],
    );
  }
}

async function upsertProducts(rows) {
  for (const row of rows) {
    const location = await client.query(
      `SELECT location_id FROM locations WHERE code = $1`,
      [row.default_location_code],
    );
    const defaultLocationId = location.rows[0]?.location_id ?? null;
    await client.query(
      `INSERT INTO products (
         sku, name, description, product_family, unit_of_measure, default_location_id, is_active
       ) VALUES (
         $1,$2,$3,$4,$5,$6,TRUE
       )
       ON CONFLICT (sku)
       DO UPDATE SET
         name = EXCLUDED.name,
         description = EXCLUDED.description,
         product_family = EXCLUDED.product_family,
         unit_of_measure = EXCLUDED.unit_of_measure,
         default_location_id = EXCLUDED.default_location_id,
         updated_at = NOW()`,
      [
        row.sku,
        row.name,
        row.description,
        row.product_family,
        row.unit_of_measure,
        defaultLocationId,
      ],
    );
  }
}

async function upsertCustomers(rows) {
  for (const row of rows) {
    await client.query(
      `INSERT INTO customers (
         account_code, name, contact_name, email, phone,
         billing_address_line1, billing_address_line2, billing_city, billing_state, billing_postal_code, billing_country,
         shipping_address_line1, shipping_address_line2, shipping_city, shipping_state, shipping_postal_code, shipping_country,
         is_active
       ) VALUES (
         $1,$2,$3,$4,$5,
         $6,$7,$8,$9,$10,$11,
         $12,$13,$14,$15,$16,$17,
         $18
       )
       ON CONFLICT (account_code)
       DO UPDATE SET
         name = EXCLUDED.name,
         contact_name = EXCLUDED.contact_name,
         email = EXCLUDED.email,
         phone = EXCLUDED.phone,
         billing_address_line1 = EXCLUDED.billing_address_line1,
         billing_address_line2 = EXCLUDED.billing_address_line2,
         billing_city = EXCLUDED.billing_city,
         billing_state = EXCLUDED.billing_state,
         billing_postal_code = EXCLUDED.billing_postal_code,
         billing_country = EXCLUDED.billing_country,
         shipping_address_line1 = EXCLUDED.shipping_address_line1,
         shipping_address_line2 = EXCLUDED.shipping_address_line2,
         shipping_city = EXCLUDED.shipping_city,
         shipping_state = EXCLUDED.shipping_state,
         shipping_postal_code = EXCLUDED.shipping_postal_code,
         shipping_country = EXCLUDED.shipping_country,
         is_active = EXCLUDED.is_active,
         updated_at = NOW()`,
      [
        row.account_code,
        row.name,
        row.contact_name,
        row.email,
        row.phone,
        row.billing_address_line1,
        row.billing_address_line2,
        row.billing_city,
        row.billing_state,
        row.billing_postal_code,
        row.billing_country,
        row.shipping_address_line1,
        row.shipping_address_line2,
        row.shipping_city,
        row.shipping_state,
        row.shipping_postal_code,
        row.shipping_country,
        row.is_active,
      ],
    );
  }
}

async function upsertResearchBriefs(rows) {
  for (const row of rows) {
    await client.query(
      `INSERT INTO research_briefs (
         code, title, summary, body_markdown, author_actor_code, created_for_actor_code,
         related_product_skus, related_customer_account_codes, status
       ) VALUES (
         $1,$2,$3,$4,$5,$6,$7::jsonb,$8::jsonb,$9
       )
       ON CONFLICT (code)
       DO UPDATE SET
         title = EXCLUDED.title,
         summary = EXCLUDED.summary,
         body_markdown = EXCLUDED.body_markdown,
         author_actor_code = EXCLUDED.author_actor_code,
         created_for_actor_code = EXCLUDED.created_for_actor_code,
         related_product_skus = EXCLUDED.related_product_skus,
         related_customer_account_codes = EXCLUDED.related_customer_account_codes,
         status = EXCLUDED.status,
         updated_at = NOW()`,
      [
        row.code,
        row.title,
        row.summary,
        row.body_markdown,
        row.author_actor_code,
        row.created_for_actor_code,
        JSON.stringify(row.related_product_skus ?? []),
        JSON.stringify(row.related_customer_account_codes ?? []),
        row.status,
      ],
    );
  }
}

try {
  await withSeedHistory(
    client,
    manifest.manifest_id,
    manifest.version,
    async () => {
      const loaded = [];
      for (const seed of manifest.seeds) {
        const rows = await readJson(seed.source_path);
        if (seed.table_name === "locations") {
          await upsertLocations(rows);
        } else if (seed.table_name === "products") {
          await upsertProducts(rows);
        } else if (seed.table_name === "customers") {
          await upsertCustomers(rows);
        } else if (seed.table_name === "research_briefs") {
          await upsertResearchBriefs(rows);
        } else {
          throw new Error(`Unsupported seed table: ${seed.table_name}`);
        }
        loaded.push({ table: seed.table_name, count: rows.length });
      }
      return { loaded };
    },
  );
  console.log("Domain seeds loaded.");
} finally {
  await client.end();
}
