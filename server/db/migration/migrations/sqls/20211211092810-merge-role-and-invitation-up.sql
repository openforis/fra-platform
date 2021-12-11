alter table users_role add column invited_at timestamptz default now();

alter table users_role add column accepted_at timestamptz;

alter table users_role drop constraint users_role_users_invitation_uuid_fk;

alter table users_role alter column invitation_uuid set default uuid_generate_v4();

drop table users_invitation;
