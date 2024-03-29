create table if not exists public.file
(
    id         bigserial    not null,
    uuid       uuid         not null default uuid_generate_v4(),
    name  varchar(255) not null,
    file       bytea        not null,
    created_at timestamp    not null default now(),
    primary key (id),
    unique (uuid)
    );
