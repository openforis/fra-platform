create table user_auth(
    id            bigserial primary key,
    user_id       bigint references users (id) on delete cascade      not null,
    assessment_id bigint references assessment (id) on delete cascade not null,
    roles         jsonb
);
