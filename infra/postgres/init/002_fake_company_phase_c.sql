CREATE TABLE IF NOT EXISTS company_profile (
  company_profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_code TEXT NOT NULL UNIQUE,
  legal_name TEXT NOT NULL,
  dba_name TEXT NULL,
  industry TEXT NOT NULL,
  base_currency TEXT NOT NULL,
  fiscal_year_start_month INTEGER NOT NULL CHECK (fiscal_year_start_month BETWEEN 1 AND 12),
  headquarters_location_code TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS departments (
  department_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  cost_center_code TEXT NOT NULL,
  manager_actor_id TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vendors (
  vendor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  primary_contact TEXT NOT NULL,
  email TEXT NULL,
  phone TEXT NULL,
  payment_terms TEXT NOT NULL,
  category TEXT NOT NULL,
  primary_location_code TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assets (
  asset_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  location_code TEXT NOT NULL,
  department_code TEXT NOT NULL,
  status TEXT NOT NULL,
  maintenance_interval_days INTEGER NOT NULL CHECK (maintenance_interval_days > 0),
  installed_on DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chart_accounts (
  chart_account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('asset','liability','equity','revenue','expense')),
  normal_balance TEXT NOT NULL CHECK (normal_balance IN ('debit','credit')),
  is_control_account BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory_positions (
  inventory_position_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position_code TEXT NOT NULL UNIQUE,
  product_sku TEXT NOT NULL,
  location_code TEXT NOT NULL,
  quantity_on_hand NUMERIC(18,4) NOT NULL,
  quantity_reserved NUMERIC(18,4) NOT NULL DEFAULT 0,
  snapshot_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory_movements (
  inventory_movement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  movement_code TEXT NOT NULL UNIQUE,
  movement_type TEXT NOT NULL,
  product_sku TEXT NOT NULL,
  from_location_code TEXT NULL,
  to_location_code TEXT NULL,
  quantity NUMERIC(18,4) NOT NULL,
  unit_of_measure TEXT NOT NULL,
  effective_at TIMESTAMPTZ NOT NULL,
  reference_code TEXT NOT NULL,
  notes TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS purchase_orders (
  purchase_order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  po_code TEXT NOT NULL UNIQUE,
  vendor_code TEXT NOT NULL,
  ordered_at TIMESTAMPTZ NOT NULL,
  expected_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL,
  currency TEXT NOT NULL,
  buyer_actor_id TEXT NOT NULL,
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS purchase_order_lines (
  purchase_order_line_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  po_code TEXT NOT NULL,
  line_number INTEGER NOT NULL CHECK (line_number > 0),
  product_sku TEXT NOT NULL,
  quantity_ordered NUMERIC(18,4) NOT NULL,
  unit_cost NUMERIC(18,4) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (po_code, line_number)
);

CREATE TABLE IF NOT EXISTS receipts (
  receipt_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_code TEXT NOT NULL UNIQUE,
  po_code TEXT NOT NULL,
  location_code TEXT NOT NULL,
  received_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL,
  notes TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS receipt_lines (
  receipt_line_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_code TEXT NOT NULL,
  line_number INTEGER NOT NULL CHECK (line_number > 0),
  product_sku TEXT NOT NULL,
  quantity_received NUMERIC(18,4) NOT NULL,
  quantity_accepted NUMERIC(18,4) NOT NULL,
  quantity_rejected NUMERIC(18,4) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (receipt_code, line_number)
);

CREATE TABLE IF NOT EXISTS work_orders (
  work_order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wo_code TEXT NOT NULL UNIQUE,
  product_sku TEXT NOT NULL,
  location_code TEXT NOT NULL,
  planned_start TIMESTAMPTZ NOT NULL,
  planned_end TIMESTAMPTZ NOT NULL,
  quantity_planned NUMERIC(18,4) NOT NULL,
  quantity_completed NUMERIC(18,4) NOT NULL DEFAULT 0,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS work_order_operations (
  work_order_operation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wo_code TEXT NOT NULL,
  operation_seq INTEGER NOT NULL CHECK (operation_seq > 0),
  work_center TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL,
  planned_hours NUMERIC(10,2) NOT NULL,
  actual_hours NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (wo_code, operation_seq)
);

CREATE TABLE IF NOT EXISTS maintenance_tickets (
  maintenance_ticket_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_code TEXT NOT NULL UNIQUE,
  asset_code TEXT NOT NULL,
  opened_at TIMESTAMPTZ NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low','medium','high','critical')),
  status TEXT NOT NULL,
  maintenance_type TEXT NOT NULL,
  summary TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sales_orders (
  sales_order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  so_code TEXT NOT NULL UNIQUE,
  customer_account_code TEXT NOT NULL,
  ordered_at TIMESTAMPTZ NOT NULL,
  requested_ship_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL,
  currency TEXT NOT NULL,
  sales_rep_actor_id TEXT NOT NULL,
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sales_order_lines (
  sales_order_line_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  so_code TEXT NOT NULL,
  line_number INTEGER NOT NULL CHECK (line_number > 0),
  product_sku TEXT NOT NULL,
  quantity_ordered NUMERIC(18,4) NOT NULL,
  quantity_allocated NUMERIC(18,4) NOT NULL DEFAULT 0,
  unit_price NUMERIC(18,4) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (so_code, line_number)
);

CREATE TABLE IF NOT EXISTS shipments (
  shipment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_code TEXT NOT NULL UNIQUE,
  so_code TEXT NOT NULL,
  ship_from_location_code TEXT NOT NULL,
  ship_to_name TEXT NOT NULL,
  carrier TEXT NOT NULL,
  tracking_number TEXT NOT NULL,
  shipped_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shipment_lines (
  shipment_line_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_code TEXT NOT NULL,
  line_number INTEGER NOT NULL CHECK (line_number > 0),
  product_sku TEXT NOT NULL,
  quantity_shipped NUMERIC(18,4) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (shipment_code, line_number)
);

CREATE TABLE IF NOT EXISTS invoices (
  invoice_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_code TEXT NOT NULL UNIQUE,
  so_code TEXT NOT NULL,
  customer_account_code TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL,
  due_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL,
  currency TEXT NOT NULL,
  total_amount NUMERIC(18,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_code TEXT NOT NULL UNIQUE,
  invoice_code TEXT NOT NULL,
  received_at TIMESTAMPTZ NOT NULL,
  amount NUMERIC(18,2) NOT NULL,
  method TEXT NOT NULL,
  reference_number TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS journal_entries (
  journal_entry_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_entry_code TEXT NOT NULL UNIQUE,
  entry_date DATE NOT NULL,
  memo TEXT NOT NULL,
  source_type TEXT NOT NULL,
  source_code TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS journal_entry_lines (
  journal_entry_line_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_entry_code TEXT NOT NULL,
  line_number INTEGER NOT NULL CHECK (line_number > 0),
  account_code TEXT NOT NULL,
  entry_type TEXT NOT NULL CHECK (entry_type IN ('debit','credit')),
  amount NUMERIC(18,2) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (journal_entry_code, line_number)
);

CREATE TABLE IF NOT EXISTS meetings (
  meeting_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  scheduled_start TIMESTAMPTZ NOT NULL,
  scheduled_end TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  organizer_actor_id TEXT NOT NULL,
  meeting_type TEXT NOT NULL,
  status TEXT NOT NULL,
  notes TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS meeting_action_items (
  meeting_action_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action_item_code TEXT NOT NULL UNIQUE,
  meeting_code TEXT NOT NULL,
  owner_actor_id TEXT NOT NULL,
  due_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
  task_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  assignee_actor_id TEXT NOT NULL,
  related_entity_type TEXT NOT NULL,
  related_entity_code TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low','medium','high','urgent')),
  status TEXT NOT NULL,
  due_at TIMESTAMPTZ NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS support_tickets (
  support_ticket_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  support_ticket_code TEXT NOT NULL UNIQUE,
  customer_account_code TEXT NOT NULL,
  opened_at TIMESTAMPTZ NOT NULL,
  channel TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low','medium','high','critical')),
  status TEXT NOT NULL,
  subject TEXT NOT NULL,
  summary TEXT NOT NULL,
  owner_actor_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS call_logs (
  call_log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_code TEXT NOT NULL UNIQUE,
  customer_account_code TEXT NOT NULL,
  occurred_at TIMESTAMPTZ NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound','outbound')),
  caller_name TEXT NOT NULL,
  summary TEXT NOT NULL,
  related_support_ticket_code TEXT NULL,
  owner_actor_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_company_profile_company_code ON company_profile (company_code);
CREATE INDEX IF NOT EXISTS idx_departments_department_code ON departments (department_code);
CREATE INDEX IF NOT EXISTS idx_vendors_vendor_code ON vendors (vendor_code);
CREATE INDEX IF NOT EXISTS idx_assets_asset_code ON assets (asset_code);
CREATE INDEX IF NOT EXISTS idx_chart_accounts_account_code ON chart_accounts (account_code);
CREATE INDEX IF NOT EXISTS idx_inventory_positions_product_location ON inventory_positions (product_sku, location_code);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_reference_code ON inventory_movements (reference_code);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_vendor_code ON purchase_orders (vendor_code);
CREATE INDEX IF NOT EXISTS idx_receipts_po_code ON receipts (po_code);
CREATE INDEX IF NOT EXISTS idx_work_orders_product_location ON work_orders (product_sku, location_code);
CREATE INDEX IF NOT EXISTS idx_maintenance_tickets_asset_code ON maintenance_tickets (asset_code);
CREATE INDEX IF NOT EXISTS idx_sales_orders_customer_code ON sales_orders (customer_account_code);
CREATE INDEX IF NOT EXISTS idx_shipments_so_code ON shipments (so_code);
CREATE INDEX IF NOT EXISTS idx_invoices_so_code ON invoices (so_code);
CREATE INDEX IF NOT EXISTS idx_payments_invoice_code ON payments (invoice_code);
CREATE INDEX IF NOT EXISTS idx_journal_entries_source_code ON journal_entries (source_code);
CREATE INDEX IF NOT EXISTS idx_meetings_start ON meetings (scheduled_start);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee_status ON tasks (assignee_actor_id, status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_customer_status ON support_tickets (customer_account_code, status);
CREATE INDEX IF NOT EXISTS idx_call_logs_customer_time ON call_logs (customer_account_code, occurred_at);
