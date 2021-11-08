alter table assessment
    rename to _legacy_assessment;

create table assessment
(
    id    bigserial NOT NULL,
    uuid  uuid  default uuid_generate_v4(),
    props jsonb default '{}'::jsonb,
    PRIMARY KEY (id)
);
