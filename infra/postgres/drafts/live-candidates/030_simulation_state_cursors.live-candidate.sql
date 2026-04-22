-- Phase Q live-candidate draft only. Not part of live bring-up.
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
  constraint chk_simulation_state_cursors_stage_id
    check (stage_id in ('small_local', 'multi_site_small', 'regional_midmarket', 'multi_region_enterprise')),
  constraint chk_simulation_state_cursors_runner_mode
    check (runner_mode in ('tick_once', 'tick_until', 'run_continuous', 'pause', 'snapshot', 'reset', 'fork_timeline')),
  constraint chk_simulation_state_cursors_total_ticks
    check (total_ticks_applied >= 0),
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

create index if not exists idx_simulation_state_cursors_checkpoint
  on simulation_state_cursors (checkpoint_id);
