create schema geo;

create table geo.forest_estimations (
    id bigserial constraint forest_estimations_pk primary key,
    country_iso varchar(3) not null constraint forest_estimations_country_country_iso_fk references country on update cascade on delete cascade,
    year int not null,
    data jsonb default '{}' :: jsonb
);

create index forest_estimations_country_iso_year_index on geo.forest_estimations (country_iso, year);