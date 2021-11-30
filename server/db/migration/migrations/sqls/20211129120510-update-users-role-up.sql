create type user_role as enum ('ADMINISTRATOR', 'COLLABORATOR', 'NATIONAL_CORRESPONDENT', 'ALTERNATE_NATIONAL_CORRESPONDENT', 'REVIEWER', 'VIEWER');

create table assessment_cycle
(
    id            bigserial                         not null,
    assessment_id bigint references assessment (id) not null,
    uuid          uuid    default uuid_generate_v4(),
    name          varchar default '',
    primary key (id),
    unique (uuid)
);
alter table assessment_cycle
    drop constraint assessment_cycle_assessment_id_fkey;

alter table assessment_cycle
    add constraint assessment_cycle_assessment_id_fkey
        foreign key (assessment_id) references assessment
            on update cascade on delete cascade;

alter table users_role
    alter column assessment_id drop not null;

alter table users_role
    drop column roles;

alter table users_role
    add role user_role not null;

alter table users_role
    add props jsonb default '{}'::jsonb not null;

alter table users_role
    add cycle_uuid uuid;

alter table users_role
    add constraint users_role_assessment_cycle_uuid_fk
        foreign key (cycle_uuid) references assessment_cycle (uuid)
            on update cascade on delete cascade;

drop index users_role_user_id_assessment_id_country_iso_uindex;

create unique index users_role_user_id_assessment_id_country_iso_cycle_uuid_uindex
    on users_role (user_id, assessment_id, country_iso, cycle_uuid);


