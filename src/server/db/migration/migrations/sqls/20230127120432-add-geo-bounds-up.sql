create table geo.bounds (
    id bigserial constraint bounds_pk primary key,
    country_iso varchar(3) not null constraint bounds_country_iso_fk references country on update cascade on delete cascade,
    data jsonb default '{}' :: jsonb,
    constraint bounds_un UNIQUE (country_iso)
);

create index bounds_country_iso_index on geo.bounds (country_iso);
