import {
  createClient,
  readJson,
  withSeedHistory,
  upsertByColumns,
} from "./_common.mjs";

const manifestPath = "lab_data/seeds/manifests/domain.seed.manifest.json";
const manifest = await readJson(manifestPath);

const client = await createClient();

const tableConfigs = {
  company_profile: {
    keyColumns: ["company_code"],
    allColumns: [
      "company_code",
      "legal_name",
      "dba_name",
      "industry",
      "base_currency",
      "fiscal_year_start_month",
      "headquarters_location_code",
      "description",
    ],
    updateColumns: [
      "legal_name",
      "dba_name",
      "industry",
      "base_currency",
      "fiscal_year_start_month",
      "headquarters_location_code",
      "description",
    ],
    touchUpdatedAt: true,
  },
  departments: {
    keyColumns: ["department_code"],
    allColumns: [
      "department_code",
      "name",
      "cost_center_code",
      "manager_actor_id",
      "is_active",
    ],
    updateColumns: [
      "name",
      "cost_center_code",
      "manager_actor_id",
      "is_active",
    ],
    touchUpdatedAt: true,
  },
  vendors: {
    keyColumns: ["vendor_code"],
    allColumns: [
      "vendor_code",
      "name",
      "primary_contact",
      "email",
      "phone",
      "payment_terms",
      "category",
      "primary_location_code",
      "is_active",
    ],
    updateColumns: [
      "name",
      "primary_contact",
      "email",
      "phone",
      "payment_terms",
      "category",
      "primary_location_code",
      "is_active",
    ],
    touchUpdatedAt: true,
  },
  assets: {
    keyColumns: ["asset_code"],
    allColumns: [
      "asset_code",
      "name",
      "asset_type",
      "location_code",
      "department_code",
      "status",
      "maintenance_interval_days",
      "installed_on",
    ],
    updateColumns: [
      "name",
      "asset_type",
      "location_code",
      "department_code",
      "status",
      "maintenance_interval_days",
      "installed_on",
    ],
    touchUpdatedAt: true,
  },
  chart_accounts: {
    keyColumns: ["account_code"],
    allColumns: [
      "account_code",
      "name",
      "account_type",
      "normal_balance",
      "is_control_account",
    ],
    updateColumns: [
      "name",
      "account_type",
      "normal_balance",
      "is_control_account",
    ],
    touchUpdatedAt: true,
  },
  inventory_positions: {
    keyColumns: ["position_code"],
    allColumns: [
      "position_code",
      "product_sku",
      "location_code",
      "quantity_on_hand",
      "quantity_reserved",
      "snapshot_at",
    ],
    updateColumns: [
      "product_sku",
      "location_code",
      "quantity_on_hand",
      "quantity_reserved",
      "snapshot_at",
    ],
    touchUpdatedAt: true,
  },
  inventory_movements: {
    keyColumns: ["movement_code"],
    allColumns: [
      "movement_code",
      "movement_type",
      "product_sku",
      "from_location_code",
      "to_location_code",
      "quantity",
      "unit_of_measure",
      "effective_at",
      "reference_code",
      "notes",
    ],
    updateColumns: [
      "movement_type",
      "product_sku",
      "from_location_code",
      "to_location_code",
      "quantity",
      "unit_of_measure",
      "effective_at",
      "reference_code",
      "notes",
    ],
    touchUpdatedAt: false,
  },
  purchase_orders: {
    keyColumns: ["po_code"],
    allColumns: [
      "po_code",
      "vendor_code",
      "ordered_at",
      "expected_at",
      "status",
      "currency",
      "buyer_actor_id",
      "notes",
    ],
    updateColumns: [
      "vendor_code",
      "ordered_at",
      "expected_at",
      "status",
      "currency",
      "buyer_actor_id",
      "notes",
    ],
    touchUpdatedAt: true,
  },
  purchase_order_lines: {
    keyColumns: ["po_code", "line_number"],
    allColumns: [
      "po_code",
      "line_number",
      "product_sku",
      "quantity_ordered",
      "unit_cost",
    ],
    updateColumns: ["product_sku", "quantity_ordered", "unit_cost"],
    touchUpdatedAt: true,
  },
  receipts: {
    keyColumns: ["receipt_code"],
    allColumns: [
      "receipt_code",
      "po_code",
      "location_code",
      "received_at",
      "status",
      "notes",
    ],
    updateColumns: [
      "po_code",
      "location_code",
      "received_at",
      "status",
      "notes",
    ],
    touchUpdatedAt: true,
  },
  receipt_lines: {
    keyColumns: ["receipt_code", "line_number"],
    allColumns: [
      "receipt_code",
      "line_number",
      "product_sku",
      "quantity_received",
      "quantity_accepted",
      "quantity_rejected",
    ],
    updateColumns: [
      "product_sku",
      "quantity_received",
      "quantity_accepted",
      "quantity_rejected",
    ],
    touchUpdatedAt: true,
  },
  work_orders: {
    keyColumns: ["wo_code"],
    allColumns: [
      "wo_code",
      "product_sku",
      "location_code",
      "planned_start",
      "planned_end",
      "quantity_planned",
      "quantity_completed",
      "status",
    ],
    updateColumns: [
      "product_sku",
      "location_code",
      "planned_start",
      "planned_end",
      "quantity_planned",
      "quantity_completed",
      "status",
    ],
    touchUpdatedAt: true,
  },
  work_order_operations: {
    keyColumns: ["wo_code", "operation_seq"],
    allColumns: [
      "wo_code",
      "operation_seq",
      "work_center",
      "description",
      "status",
      "planned_hours",
      "actual_hours",
    ],
    updateColumns: [
      "work_center",
      "description",
      "status",
      "planned_hours",
      "actual_hours",
    ],
    touchUpdatedAt: true,
  },
  maintenance_tickets: {
    keyColumns: ["ticket_code"],
    allColumns: [
      "ticket_code",
      "asset_code",
      "opened_at",
      "priority",
      "status",
      "maintenance_type",
      "summary",
    ],
    updateColumns: [
      "asset_code",
      "opened_at",
      "priority",
      "status",
      "maintenance_type",
      "summary",
    ],
    touchUpdatedAt: true,
  },
  sales_orders: {
    keyColumns: ["so_code"],
    allColumns: [
      "so_code",
      "customer_account_code",
      "ordered_at",
      "requested_ship_at",
      "status",
      "currency",
      "sales_rep_actor_id",
      "notes",
    ],
    updateColumns: [
      "customer_account_code",
      "ordered_at",
      "requested_ship_at",
      "status",
      "currency",
      "sales_rep_actor_id",
      "notes",
    ],
    touchUpdatedAt: true,
  },
  sales_order_lines: {
    keyColumns: ["so_code", "line_number"],
    allColumns: [
      "so_code",
      "line_number",
      "product_sku",
      "quantity_ordered",
      "quantity_allocated",
      "unit_price",
    ],
    updateColumns: [
      "product_sku",
      "quantity_ordered",
      "quantity_allocated",
      "unit_price",
    ],
    touchUpdatedAt: true,
  },
  shipments: {
    keyColumns: ["shipment_code"],
    allColumns: [
      "shipment_code",
      "so_code",
      "ship_from_location_code",
      "ship_to_name",
      "carrier",
      "tracking_number",
      "shipped_at",
      "status",
    ],
    updateColumns: [
      "so_code",
      "ship_from_location_code",
      "ship_to_name",
      "carrier",
      "tracking_number",
      "shipped_at",
      "status",
    ],
    touchUpdatedAt: true,
  },
  shipment_lines: {
    keyColumns: ["shipment_code", "line_number"],
    allColumns: [
      "shipment_code",
      "line_number",
      "product_sku",
      "quantity_shipped",
    ],
    updateColumns: ["product_sku", "quantity_shipped"],
    touchUpdatedAt: false,
  },
  invoices: {
    keyColumns: ["invoice_code"],
    allColumns: [
      "invoice_code",
      "so_code",
      "customer_account_code",
      "issued_at",
      "due_at",
      "status",
      "currency",
      "total_amount",
    ],
    updateColumns: [
      "so_code",
      "customer_account_code",
      "issued_at",
      "due_at",
      "status",
      "currency",
      "total_amount",
    ],
    touchUpdatedAt: true,
  },
  payments: {
    keyColumns: ["payment_code"],
    allColumns: [
      "payment_code",
      "invoice_code",
      "received_at",
      "amount",
      "method",
      "reference_number",
    ],
    updateColumns: [
      "invoice_code",
      "received_at",
      "amount",
      "method",
      "reference_number",
    ],
    touchUpdatedAt: false,
  },
  journal_entries: {
    keyColumns: ["journal_entry_code"],
    allColumns: [
      "journal_entry_code",
      "entry_date",
      "memo",
      "source_type",
      "source_code",
      "status",
    ],
    updateColumns: [
      "entry_date",
      "memo",
      "source_type",
      "source_code",
      "status",
    ],
    touchUpdatedAt: true,
  },
  journal_entry_lines: {
    keyColumns: ["journal_entry_code", "line_number"],
    allColumns: [
      "journal_entry_code",
      "line_number",
      "account_code",
      "entry_type",
      "amount",
      "description",
    ],
    updateColumns: ["account_code", "entry_type", "amount", "description"],
    touchUpdatedAt: false,
  },
  meetings: {
    keyColumns: ["meeting_code"],
    allColumns: [
      "meeting_code",
      "title",
      "scheduled_start",
      "scheduled_end",
      "location",
      "organizer_actor_id",
      "meeting_type",
      "status",
      "notes",
    ],
    updateColumns: [
      "title",
      "scheduled_start",
      "scheduled_end",
      "location",
      "organizer_actor_id",
      "meeting_type",
      "status",
      "notes",
    ],
    touchUpdatedAt: true,
  },
  meeting_action_items: {
    keyColumns: ["action_item_code"],
    allColumns: [
      "action_item_code",
      "meeting_code",
      "owner_actor_id",
      "due_at",
      "status",
      "description",
    ],
    updateColumns: [
      "meeting_code",
      "owner_actor_id",
      "due_at",
      "status",
      "description",
    ],
    touchUpdatedAt: true,
  },
  tasks: {
    keyColumns: ["task_code"],
    allColumns: [
      "task_code",
      "title",
      "assignee_actor_id",
      "related_entity_type",
      "related_entity_code",
      "priority",
      "status",
      "due_at",
      "description",
    ],
    updateColumns: [
      "title",
      "assignee_actor_id",
      "related_entity_type",
      "related_entity_code",
      "priority",
      "status",
      "due_at",
      "description",
    ],
    touchUpdatedAt: true,
  },
  support_tickets: {
    keyColumns: ["support_ticket_code"],
    allColumns: [
      "support_ticket_code",
      "customer_account_code",
      "opened_at",
      "channel",
      "priority",
      "status",
      "subject",
      "summary",
      "owner_actor_id",
    ],
    updateColumns: [
      "customer_account_code",
      "opened_at",
      "channel",
      "priority",
      "status",
      "subject",
      "summary",
      "owner_actor_id",
    ],
    touchUpdatedAt: true,
  },
  call_logs: {
    keyColumns: ["call_code"],
    allColumns: [
      "call_code",
      "customer_account_code",
      "occurred_at",
      "direction",
      "caller_name",
      "summary",
      "related_support_ticket_code",
      "owner_actor_id",
    ],
    updateColumns: [
      "customer_account_code",
      "occurred_at",
      "direction",
      "caller_name",
      "summary",
      "related_support_ticket_code",
      "owner_actor_id",
    ],
    touchUpdatedAt: false,
  },
};

async function upsertLocations(rows) {
  const config = {
    keyColumns: ["code"],
    allColumns: [
      "code",
      "name",
      "description",
      "address_line1",
      "address_line2",
      "city",
      "state",
      "postal_code",
      "country",
      "latitude",
      "longitude",
      "location_type",
      "is_active",
    ],
    updateColumns: [
      "name",
      "description",
      "address_line1",
      "address_line2",
      "city",
      "state",
      "postal_code",
      "country",
      "latitude",
      "longitude",
      "location_type",
      "is_active",
    ],
    touchUpdatedAt: true,
  };
  await upsertByColumns(client, "locations", rows, config);
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
  const config = {
    keyColumns: ["account_code"],
    allColumns: [
      "account_code",
      "name",
      "contact_name",
      "email",
      "phone",
      "billing_address_line1",
      "billing_address_line2",
      "billing_city",
      "billing_state",
      "billing_postal_code",
      "billing_country",
      "shipping_address_line1",
      "shipping_address_line2",
      "shipping_city",
      "shipping_state",
      "shipping_postal_code",
      "shipping_country",
      "is_active",
    ],
    updateColumns: [
      "name",
      "contact_name",
      "email",
      "phone",
      "billing_address_line1",
      "billing_address_line2",
      "billing_city",
      "billing_state",
      "billing_postal_code",
      "billing_country",
      "shipping_address_line1",
      "shipping_address_line2",
      "shipping_city",
      "shipping_state",
      "shipping_postal_code",
      "shipping_country",
      "is_active",
    ],
    touchUpdatedAt: true,
  };
  await upsertByColumns(client, "customers", rows, config);
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
          const config = tableConfigs[seed.table_name];
          if (!config) {
            throw new Error(`Unsupported seed table: ${seed.table_name}`);
          }
          await upsertByColumns(client, seed.table_name, rows, config);
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
