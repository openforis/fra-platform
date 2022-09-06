export const getCreateSchemaDDL = (schemaName: string): string => {
  const query = `
  create schema ${schemaName};

create table ${schemaName}.section
(
    id            bigserial NOT NULL,
    uuid          uuid  default uuid_generate_v4(),
    parent_id     bigint   references ${schemaName}.section (id) on update cascade on delete cascade,
    props         jsonb default '{}'::jsonb,
    PRIMARY KEY (id),
    unique(uuid)
);

create table ${schemaName}.table_section
(
    id         bigserial NOT NULL,
    uuid       uuid  default uuid_generate_v4(),
    props      jsonb default '{}'::jsonb,
    section_id bigint   not null references ${schemaName}.section (id) on update cascade on delete cascade,
    PRIMARY KEY (id),
    unique(uuid)
);


create table ${schemaName}.table
(
    id               bigserial NOT NULL,
    uuid             uuid  default uuid_generate_v4(),
    props            jsonb default '{}'::jsonb,
    table_section_id bigint   not null references ${schemaName}.table_section (id) on update cascade on delete cascade,
    PRIMARY KEY (id),
    unique(uuid)
);


create table ${schemaName}.row
(
    id       bigserial NOT NULL,
    uuid     uuid  default uuid_generate_v4(),
    props    jsonb default '{}'::jsonb,
    table_id bigint   not null references ${schemaName}.table (id) on update cascade on delete cascade,
    PRIMARY KEY (id),
    unique(uuid)
);

create table ${schemaName}.col
(
    id     bigserial NOT NULL,
    uuid   uuid  default uuid_generate_v4(),
    props  jsonb default '{}'::jsonb,
    row_id bigint   not null references ${schemaName}.row (id) on update cascade on delete cascade,
    PRIMARY KEY (id),
    unique(uuid)
);

  create table ${schemaName}.activity_log
  (
      time             timestamp default timezone('UTC'::text, now()) not null,
      message          text,
      country_iso      varchar(3) references public.country,
      section          varchar(250)                                   not null,
      target           json,
      id               bigserial                                      not null,
      user_id          bigint not null references public.users (id)   on update cascade on delete cascade,
      cycle_uuid       uuid references public.assessment_cycle (uuid) on update cascade on delete cascade

  );

create table ${schemaName}.file
(
    id               bigserial NOT NULL,
    uuid             uuid  default uuid_generate_v4(),
    country_iso      varchar(3) references public.country,
    file_name        varchar(250) NOT NULL,
    file             bytea NOT NULL
);
`
  return query
}

export const getCreateSchemaCycleDDL = (assessmentSchemaName: string, assessmentCycleSchemaName: string): string => {
  return `
      create schema ${assessmentCycleSchemaName};
      
      create table ${assessmentCycleSchemaName}.node
      (
          id     bigserial                        not null
              constraint node_pk
                  primary key,
          uuid   uuid  default uuid_generate_v4() not null,
          country_iso varchar(3)                           not null
              constraint node_country_iso_fk
                  references country (country_iso)
                  on update cascade on delete cascade,
          row_uuid uuid                           not null
              constraint node_row_uuid_fk
                  references ${assessmentSchemaName}.row (uuid)
                  on update cascade on delete cascade,
          col_uuid uuid                           not null
              constraint node_col_uuid_fk
                  references ${assessmentSchemaName}.col (uuid)
                  on update cascade on delete cascade,
          value  jsonb default '{}'::jsonb        not null
      );

      create unique index node_uuid_uindex
          on ${assessmentCycleSchemaName}.node (uuid);
          
      create unique index node_country_iso_col_uuid_row_uuid_uindex
          on ${assessmentCycleSchemaName}.node (country_iso, col_uuid, row_uuid);
    
      create table ${assessmentCycleSchemaName}.original_data_point
      (
          id                              bigserial
              constraint original_data_point_pk
                  primary key,
          country_iso                     varchar(3) not null
              constraint original_data_point_country_country_iso_fk
                  references country (country_iso)
                  on update cascade on delete cascade,
          year                            integer,
          data_source_additional_comments varchar,
          data_source_methods             jsonb,
          data_source_references          text,
          description                     text,
          national_classes                jsonb,
          id_legacy                       bigint
      );

      ALTER TABLE ${assessmentCycleSchemaName}.original_data_point
          ADD CONSTRAINT unique_country_year UNIQUE (country_iso, year);


      create table ${assessmentCycleSchemaName}.country
      (
          country_iso varchar(3) not null
              constraint country_fk
                  references country
                  on update cascade on delete cascade,
          props jsonb default '{}'::jsonb,
          unique (country_iso)
      );
      
      create table ${assessmentCycleSchemaName}.region_group
      (
          id bigserial not null constraint region_group_pkey primary key,
          name varchar not null,
          "order" integer not null
      );
     
      create table ${assessmentCycleSchemaName}.region
      (
        region_group_id bigint references ${assessmentCycleSchemaName}.region_group (id) on update cascade on delete cascade,
        region_code varchar references region on update cascade on delete cascade,
          unique (region_code, region_group_id)
      );
      
      create table ${assessmentCycleSchemaName}.country_region
      (
        country_iso varchar(3) not null
                  references country
                  on update cascade on delete cascade,
        region_code varchar not null
                  references region 
                  on update cascade on delete cascade,
          unique (country_iso, region_code)
      );
      
      create table ${assessmentCycleSchemaName}.message_topic
      (
          id            bigserial                             not null
              constraint message_topic_pk
                  primary key,
          country_iso   varchar(3)                            not null
              constraint message_topic_country_country_iso_fk
                  references country
                  on update cascade on delete cascade,
          key           varchar(256)                          not null,
          status        message_topic_status default 'opened' not null,
          type          message_topic_type                    not null
      );
      
      create unique index message_topic_country_iso_key_uindex
          on ${assessmentCycleSchemaName}.message_topic (country_iso, key);
      
      create table ${assessmentCycleSchemaName}.message
      (
          id           bigserial                 not null
              constraint message_pk primary key,
          topic_id     bigint                    not null
              constraint message_message_topic_id_fk
                  references ${assessmentCycleSchemaName}.message_topic
                  on update cascade on delete cascade,
          user_id      bigint                    not null
              constraint message_users_id_fk
                  references users
                  on update cascade on delete cascade,
          message      text                      not null,
          deleted      boolean     default false not null,
          created_time timestamptz default now() not null
      );
      
      create table ${assessmentCycleSchemaName}.message_topic_user
      (
          id             bigserial                 not null
              constraint message_topic_user_pk
                  primary key,
          topic_id       bigint                    not null
              constraint message_topic_user_message_topic_id_fk
                  references ${assessmentCycleSchemaName}.message_topic
                  on update cascade on delete cascade,
          user_id        bigint                    not null
              constraint message_topic_user_users_id_fk
                  references users
                  on update cascade on delete cascade,
          last_open_time timestamptz default now() not null
      );

      create table ${assessmentCycleSchemaName}.value_aggregate
      (
          country_iso   varchar(3)                            not null
              constraint message_topic_country_country_iso_fk
                  references country
                  on update cascade on delete cascade,
          variable_name           varchar(256)                not null,
          col_name                varchar(256)                not null,
          value                   jsonb default '{}'::jsonb
      );
      
      create table ${assessmentCycleSchemaName}.descriptions
      (
          id           bigserial
              constraint descriptions_pk
                  primary key,
          country_iso  varchar(3)      not null
              constraint table_name_country_country_iso_fk
                  references country
                  on update cascade on delete cascade,
          section_name varchar(50)     not null,
          name         varchar(50)     not null,
          content      text default '' not null,
          constraint table_name_pk_2
              unique (country_iso, section_name, name)
      );
  `
}

export const getCreateSchemaCycleOriginalDataPointViewDDL = (assessmentCycleSchemaName: string): string => {
  return `
      create or replace view ${assessmentCycleSchemaName}.original_data_point_data as
      with classes as (
          select o.country_iso,
                 o.year,
                 jsonb_array_elements(o.national_classes) as class
          from ${assessmentCycleSchemaName}.original_data_point o
      ),
            country_years as (
               select c.country_iso,
                      jsonb_object_keys(c.config -> 'faoStat') as year
               from country c
               order by c.country_iso
           ),
           extentofforest as (
              select c.country_iso,
                    cy.year                   as col_name,
                    jsonb_build_object('totalLandArea',
                                       jsonb_build_object(
                                               'raw', jsonb_extract_path(
                                               c.config, 'faoStat', cy.year, 'area'
                                           )::varchar
                                           )) as data
             from country c
                  left join country_years cy on c.country_iso = cy.country_iso
           ),
           raw_values as (
               select c.country_iso,
                      c.year,
                      sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                          100::numeric)                                                                as forest_area,
                      sum(((c.class ->> 'area'::text)::numeric) *
                          ((c.class ->> 'otherWoodedLandPercent'::text)::numeric) /
                          100::numeric)                                                                as other_wooded_land,
                      sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                          100::numeric *
                          ((c.class ->> 'forestNaturalPercent'::text)::numeric) /
                          100::numeric)                                                                as natural_forest_area,
                      sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                          100::numeric *
                          ((c.class ->> 'forestPlantationPercent'::text)::numeric) /
                          100::numeric)                                                                as plantation_forest_area,
                      sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                          100::numeric *
                          ((c.class ->> 'forestPlantationPercent'::text)::numeric) / 100::numeric *
                          ((c.class ->> 'forestPlantationIntroducedPercent'::text)::numeric) /
                          100::numeric)                                                                as plantation_forest_introduced_area,
                      sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                          100::numeric *
                          ((c.class ->> 'otherPlantedForestPercent'::text)::numeric) /
                          100::numeric)                                                                as other_planted_forest_area,
                      sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                          100::numeric *
                          ((c.class ->> 'forestPlantationPercent'::text)::numeric) / 100::numeric) +
                      sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                          100::numeric *
                          ((c.class ->> 'otherPlantedForestPercent'::text)::numeric) /
                          100::numeric)                                                                as planted_forest,
                      sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                          100::numeric *
                          ((c.class ->> 'forestNaturalPercent'::text)::numeric) / 100::numeric) +
                      (sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                           100::numeric *
                           ((c.class ->> 'forestPlantationPercent'::text)::numeric) / 100::numeric) +
                       sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                           100::numeric *
                           ((c.class ->> 'otherPlantedForestPercent'::text)::numeric) / 100::numeric)) as total
               from classes c
               group by c.country_iso, c.year
               order by c.country_iso, c.year)
      select rv.country_iso,
             rv.year,
             rv.forest_area,
             rv.other_wooded_land,
             rv.natural_forest_area,
             rv.plantation_forest_area,
             rv.plantation_forest_introduced_area,
             rv.other_planted_forest_area,
             rv.planted_forest,
             rv.total,
             (e.data -> 'totalLandArea' ->> 'raw')::double precision                                         as total_land_area,
             (e.data -> 'totalLandArea' ->> 'raw')::double precision - rv.forest_area -
             rv.other_wooded_land                                                                            as other_land,
             rv.planted_forest + rv.natural_forest_area                                                      as total_forest_area
      from raw_values rv
               left join extentofforest e
                         on e.country_iso = rv.country_iso
                             and e.col_name = rv.year::text
      ;
  `
}
