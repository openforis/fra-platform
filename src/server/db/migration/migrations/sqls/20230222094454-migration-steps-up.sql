create table migration_steps
(
    id     serial                   not null,
    name   varchar(255) primary key not null,
    run_on timestamp                not null default now()
);
