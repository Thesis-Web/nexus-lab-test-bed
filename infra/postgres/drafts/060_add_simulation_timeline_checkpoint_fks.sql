-- Phase M draft only. Not part of live bring-up.
alter table simulation_timelines
  add constraint fk_simulation_timelines_source_checkpoint
  foreign key (source_checkpoint_id)
  references simulation_checkpoints (checkpoint_id)
  on delete set null;

alter table simulation_timelines
  add constraint fk_simulation_timelines_head_checkpoint
  foreign key (head_checkpoint_id)
  references simulation_checkpoints (checkpoint_id)
  on delete set null;
