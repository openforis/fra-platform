drop table if exists activity_log;

create table activity_log
(
    "time"           timestamp default timezone('UTC'::text, now()) not null,
    message          text                                           not null,
    country_iso      varchar(3) references public.country,
    section          varchar(250)                                   not null,
    target           jsonb,
    id               bigserial                                      not null,
    user_id          bigint not null references public.users (id)   on update cascade on delete cascade,
    assessment_uuid  uuid references public.assessment (uuid)       on update cascade on delete cascade,
    cycle_uuid       uuid references public.assessment_cycle (uuid) on update cascade on delete cascade
);

CREATE INDEX IF NOT EXISTS idx_activity_log_cycle_message ON public.activity_log (cycle_uuid, message);
CREATE INDEX IF NOT EXISTS idx_activity_log_filtering ON public.activity_log (assessment_uuid, cycle_uuid, country_iso, message, time DESC);
