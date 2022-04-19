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
      user_id bigint not null references public.users (id)            on update cascade on delete cascade
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
  `
}

export const getCreateSchemaCycleOriginalDataPointViewDDL = (assessmentCycleSchemaName: string): string => {
  return `
        create or replace view ${assessmentCycleSchemaName}.original_data_point_data as
      with classes as (
          select o.country_iso, o.year, jsonb_array_elements(o.national_classes) as class
          from ${assessmentCycleSchemaName}.original_data_point o
      )
      select c.country_iso,
             c.year,
      --        c.class ->> 'area'                                                     as area,
             sum((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) as forest,
             sum((c.class ->> 'area')::numeric *
                 (c.class ->> 'otherWoodedLandPercent')::numeric / 100)                        as other_wooded_land,
      --        sum((c.class ->> 'area')::numeric *
      --            (
      --                    100 - coalesce(c.class ->> 'forestPercent', '0')::numeric -
      --                    coalesce(c.class ->> 'otherWoodedLandPercent', '0')::numeric
      --                ) / 100)                                                                  as other_land
             sum(
                             ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) * -- forest
                             (c.class ->> 'forestNaturalPercent')::numeric / 100
                 )                                                                             as natural_forest_area,
             sum(
                             ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) * -- forest
                             (c.class ->> 'forestPlantationPercent')::numeric / 100
                 )                                                                             as plantation_forest_area,
             sum(
                             (
                                         ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) *
                                         (c.class ->> 'forestPlantationPercent')::numeric / 100
                                 ) -- plantation_forest_area
                             *
                             (c.class ->> 'forestPlantationIntroducedPercent')::numeric / 100
                 )                                                                             as plantation_forest_introduced_area,
             sum(
                             ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) * -- forest
                             (c.class ->> 'otherPlantedForestPercent')::numeric / 100
                 )                                                                             as other_planted_forest_area,
             sum(
                             ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) * -- forest
                             (c.class ->> 'forestPlantationPercent')::numeric / 100
                 ) -- plantation_forest_area
                 +
             sum(
                             ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) * -- forest
                             (c.class ->> 'otherPlantedForestPercent')::numeric / 100
                 ) -- other_planted_forest_area
                                                                                               as planted_forest,
             (
                 sum(
                                 ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) * -- forest
                                 (c.class ->> 'forestNaturalPercent')::numeric / 100
                     ) -- natural_forest_area
                 )
                 +
             (
                     sum(
                                     ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric /
                                      100) * -- forest
                                     (c.class ->> 'forestPlantationPercent')::numeric / 100
                         ) -- plantation_forest_area
                     +
                     sum(
                                     ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric /
                                      100) * -- forest
                                     (c.class ->> 'otherPlantedForestPercent')::numeric / 100
                         ) -- other_planted_forest_area
                 ) -- planted_forest
                                                                                               as total
        from classes c
        group by c.country_iso, c.year
        order by c.country_iso, c.year;
  `
}
