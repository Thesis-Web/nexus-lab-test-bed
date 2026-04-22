-- Phase M draft only. Not part of live bring-up.
create table if not exists simulation_timelines (
  timeline_id text primary key,
  source_timeline_id text null,
  source_checkpoint_id text null,
  created_at timestamptz not null,
  branch_reason text null,
  status text not null,
  head_checkpoint_id text null,
  constraint fk_simulation_timelines_source_timeline
    foreign key (source_timeline_id)
    references simulation_timelines (timeline_id)
    on delete set null
);

create index if not exists idx_simulation_timelines_status
  on simulation_timelines (status);
