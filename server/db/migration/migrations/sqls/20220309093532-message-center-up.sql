create type message_topic_status as enum ('opened', 'resolved');

create table message_topic
(
    id            bigserial                             not null
        constraint message_topic_pk
            primary key,
    country_iso   varchar(3)                            not null
        constraint message_topic_country_country_iso_fk
            references country
            on update cascade on delete cascade,
    assessment_id bigint                                not null
        constraint message_topic_assessment_id_fk
            references assessment
            on update cascade on delete cascade,
    cycle_id      bigint                                not null
        constraint message_topic_assessment_cycle_id_fk
            references assessment_cycle
            on update cascade on delete cascade,
    key           varchar(256)                          not null,
    status        message_topic_status default 'opened' not null
);

create unique index message_topic_assessment_id_cycle_id_country_iso_key_uindex
    on message_topic (assessment_id, cycle_id, country_iso, key);

create table message
(
    id           bigserial                 not null
        constraint message_pk primary key,
    topic_id     bigint                    not null
        constraint message_message_topic_id_fk
            references message_topic
            on update cascade on delete cascade,
    user_id      bigint                    not null
        constraint message_users_id_fk
            references users
            on update cascade on delete cascade,
    message      text                      not null,
    deleted      boolean     default false not null,
    created_time timestamptz default now() not null
);

create table message_topic_user
(
    id             bigserial                 not null
        constraint message_topic_user_pk
            primary key,
    topic_id       bigint                    not null
        constraint message_topic_user_message_topic_id_fk
            references message_topic
            on update cascade on delete cascade,
    user_id        bigint                    not null
        constraint message_topic_user_users_id_fk
            references users
            on update cascade on delete cascade,
    last_open_time timestamptz default now() not null
);
