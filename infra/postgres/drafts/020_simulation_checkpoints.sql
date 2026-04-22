-- Phase M draft only. Not part of live bring-up.
create table if not exists simulation_checkpoints (
  checkpoint_id text primary key,
  timeline_id text not null,
  created_at timestamptz not null,
  capture_mode text not null,
  stage_id text not null,
  simulation_timestamp timestamptz not null,
  parent_checkpoint_id text null,
  world_state_hash text not null,
  notes text null,
  constraint fk_simulation_checkpoints_timeline
    foreign key (timeline_id)
    references simulation_timelines (timeline_id)
    on delete cascade,
  constraint fk_simulation_checkpoints_parent
    foreign key (parent_checkpoint_id)
    references simulation_checkpoints (checkpoint_id)
    on delete set null
);

create index if not exists idx_simulation_checkpoints_timeline_ts
  on simulation_checkpoints (timeline_id, simulation_timestamp desc);
