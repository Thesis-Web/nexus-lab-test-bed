-- Phase M draft only. Not part of live bring-up.
create table if not exists simulation_tick_ledger (
  tick_ledger_id text primary key,
  timeline_id text not null,
  checkpoint_id text null,
  tick_id text not null,
  started_at timestamptz not null,
  completed_at timestamptz not null,
  applied_generator_ids_json jsonb not null,
  emitted_artifact_refs_json jsonb not null,
  world_state_hash_before text not null,
  world_state_hash_after text not null,
  constraint fk_simulation_tick_ledger_timeline
    foreign key (timeline_id)
    references simulation_timelines (timeline_id)
    on delete cascade,
  constraint fk_simulation_tick_ledger_checkpoint
    foreign key (checkpoint_id)
    references simulation_checkpoints (checkpoint_id)
    on delete set null
);

create index if not exists idx_simulation_tick_ledger_timeline_started
  on simulation_tick_ledger (timeline_id, started_at desc);
