-- Phase M draft only. Not part of live bring-up.
create table if not exists simulation_state_cursors (
  cursor_id text primary key,
  timeline_id text not null unique,
  stage_id text not null,
  simulation_timestamp timestamptz not null,
  last_tick_id text null,
  total_ticks_applied bigint not null,
  runner_mode text not null,
  checkpoint_id text null,
  updated_at timestamptz not null,
  constraint fk_simulation_state_cursors_timeline
    foreign key (timeline_id)
    references simulation_timelines (timeline_id)
    on delete cascade,
  constraint fk_simulation_state_cursors_checkpoint
    foreign key (checkpoint_id)
    references simulation_checkpoints (checkpoint_id)
    on delete set null
);

create index if not exists idx_simulation_state_cursors_timeline
  on simulation_state_cursors (timeline_id);
