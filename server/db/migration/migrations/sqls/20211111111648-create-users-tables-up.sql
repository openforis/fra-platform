create type users_status as enum ('invitationPending', 'active', 'inactive');

create table users
(
    institution              varchar(1024),
    lang                     varchar(2) default 'en'::character varying not null,
    id                       bigserial
        constraint users_pkey
            primary key,
    profile_picture_filename varchar(1024),
    name                     varchar(1024),
    status                   users_status default 'invitationPending' not null,
    profile_picture_file     bytea,
    position                 varchar(1024),
    email                    varchar(255) not null,
    unique(email)
);

create type auth_provider as enum ('local', 'google');

create table users_provider
(
    id                      bigserial
        constraint users_provider_pkey
            primary key,
    user_id                 bigint references users (id) not null,
    provider                auth_provider not null,
    props                   jsonb
);

create table users_invitation
(
    uuid                    uuid primary key,
    invited_at              timestamptz default now(),
    accepted_at             timestamptz,
    user_id                 bigint references users (id) not null
);

create table users_reset_password
(
    uuid                    uuid primary key,
    changed_at              timestamptz default now(),
    created_at              timestamptz default now(),
    user_id                 bigint references users (id) not null
);
