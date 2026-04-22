-- Phase M draft only. Not part of live bring-up.
create table if not exists simulation_snapshot_materializations (
  materialization_id text primary key,
  checkpoint_id text not null,
  storage_mode text not null,
  storage_ref text not null,
  serialization_format text not null,
  created_at timestamptz not null,
  constraint fk_simulation_snapshot_materializations_checkpoint
    foreign key (checkpoint_id)
    references simulation_checkpoints (checkpoint_id)
    on delete cascade
);

create index if not exists idx_simulation_snapshot_materializations_checkpoint
  on simulation_snapshot_materializations (checkpoint_id);
