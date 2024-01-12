create table if not exists public.file
(
    id         bigserial    not null,
    uuid       uuid         not null default uuid_generate_v4(),
    file_name  varchar(255) not null,
    file       bytea        not null,
    created_at timestamp    not null default now(),
    updated_at timestamp,
    primary key (id),
    unique (uuid)
    );
