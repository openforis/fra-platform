drop table if exists activity_log;

create table activity_log
(
    "time"           timestamp default timezone('UTC'::text, now()) not null,
    message          text,
    country_iso      varchar(3) references public.country,
    section          varchar(250)                                   not null,
    target           json,
    id               bigserial                                      not null,
    user_id          bigint not null references public.users (id)   on update cascade on delete cascade,
    assessment_uuid  uuid references public.assessment (uuid) on update cascade on delete cascade,
    cycle_uuid       uuid references public.assessment_cycle (uuid) on update cascade on delete cascade
);
