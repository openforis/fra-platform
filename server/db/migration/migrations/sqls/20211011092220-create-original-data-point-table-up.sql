drop table if exists original_data_point;

create table original_data_point
(
    id                              bigserial
        constraint original_data_point_pk
            primary key,
    country_iso                     varchar not null
        constraint original_data_point_country_country_iso_fk
            references country
            on update cascade on delete cascade,
    year                            integer,
    data_source_additional_comments varchar,
    data_source_methods             jsonb,
    data_source_references          text,
    description                     text,
    national_classes                jsonb
);

ALTER TABLE original_data_point
    ADD CONSTRAINT unique_country_year UNIQUE (country_iso, year);

insert into original_data_point
(country_iso, year, data_source_additional_comments, data_source_methods,
 data_source_references, description, national_classes)
with o as (
    SELECT o.id,
           o.country_iso,
           CASE
               WHEN o.draft_id IS NULL
                   THEN o.actual_id
               ELSE o.draft_id
               END AS version_id
    from odp o
    order by o.country_iso, version_id
),
     v as (
         select o.country_iso,
                o.id,
                o.version_id,
                v.year,
                v.data_source_additional_comments,
                v.data_source_methods,
                v.data_source_references,
                v.description
         from o
                  left join odp_version v on v.id = o.version_id
         order by o.country_iso, v.year, v.id
     ),
     c as (
         select o.id,
                o.version_id,
                coalesce(
                        jsonb_agg(
                                jsonb_build_object(
                                        'area', c.area,
                                        'definition', c.definition,
                                        'name', c.name,
                                        'uuid', c.uuid,
                                        'forestPercent', c.forest_percent,
                                        'forestNaturalPercent', c.forest_natural_percent,
                                        'forestPlantationPercent', c.forest_plantation_percent,
                                        'forestPlantationIntroducedPercent', c.forest_plantation_introduced_percent,
                                        'otherPlantedForestPercent', c.other_planted_forest_percent,
                                        'otherWoodedLandPercent', c.other_wooded_land_percent
                                    )
                            )
                        filter(where c.uuid is not null)
                    , '[]') as national_classes
         from odp_class c
                  right join o on o.version_id = c.odp_version_id
         group by o.id, o.version_id
         order by o.id, o.version_id
     )
select v.country_iso,
       v.year,
       v.data_source_additional_comments,
       v.data_source_methods,
       v.data_source_references,
       v.description,
       c.national_classes
from v
         left join c on c.version_id = v.version_id
order by v.country_iso, v.year
