export const getCreateSchemaDDL = (schemaName: string): string => {
  const query = `
create schema ${schemaName};

do $$ 
begin
    create type message_topic_status as enum ('opened', 'resolved');
exception
    when duplicate_object then null;
end $$;

do $$ 
begin
    create type message_topic_type as enum ('review', 'chat', 'messageboard');
exception
    when duplicate_object then null;
end $$;

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
          values                          jsonb,
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
          type          message_topic_type                    not null,
          section_uuid uuid
            constraint message_topic_section_uuid_fk
            references ${assessmentSchemaName}.section (uuid)
            on update cascade on delete cascade
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

      create table ${assessmentCycleSchemaName}.descriptions
      (
          id           bigserial        constraint descriptions_pk   primary key,
          country_iso  varchar(3)       not null
              constraint table_name_country_country_iso_fk
                  references country
                  on update cascade on delete cascade,
          section_name varchar(256)     not null,
          name         varchar(256)     not null,
          value      jsonb default '{}'::jsonb not null,
          constraint table_name_pk_2 unique (country_iso, section_name, name)
      );
      
      create table ${assessmentCycleSchemaName}.node_ext
      (
          country_iso varchar(3) references country(country_iso)
              on update cascade on delete cascade,
          id bigint generated by default as identity,
          parent_uuid uuid,
          props jsonb default '{}'::jsonb,
          type varchar(255) not null,
          uuid uuid not null default uuid_generate_v4(),
          value jsonb default '{}'::jsonb,
          primary key (id),
          unique (uuid)
      );
      alter table ${assessmentCycleSchemaName}.node_ext
          add constraint node_ext_node_ext_uuid_fk
              foreign key (parent_uuid) references ${assessmentCycleSchemaName}.node_ext (uuid)
                on update cascade on delete cascade;
      create index node_ext_country_iso_idx on ${assessmentCycleSchemaName}.node_ext (country_iso);
      
      create table ${assessmentCycleSchemaName}.node_values_estimation
      (
          id          bigserial                       not null
              constraint node_values_estimation_pk
                  primary key,
          uuid        uuid default uuid_generate_v4() not null,
          country_iso varchar(3)                      not null
              constraint node_values_estimation_country_fk
                  references country (country_iso)
                  on update cascade on delete cascade,
          table_uuid  uuid                            not null
              constraint node_values_estimation_table_fk
                  references ${assessmentSchemaName}."table" (uuid)
                  on update cascade on delete cascade,
          created_at  timestamp with time zone default now() not null,        
          method      varchar(255)                    not null,
          variables   jsonb                           not null,
          unique (uuid)
      );
      
      create table if not exists ${assessmentCycleSchemaName}.repository
      (
          id          bigserial     not null,
          uuid        uuid          not null default uuid_generate_v4(),
          country_iso varchar(3)    references public.country (country_iso) on update cascade on delete cascade,
          file_uuid   uuid          references public.file (uuid) on update cascade on delete cascade,
          link        varchar(2048),
          props       jsonb         not null,
          primary key (id),
          unique (uuid)
      );

      create table if not exists ${assessmentCycleSchemaName}.link
      (
          id          bigserial     not null,
          uuid        uuid          not null default uuid_generate_v4(),
          country_iso varchar(3)    references public.country (country_iso) on update cascade on delete cascade,
          link        varchar(2048) not null,
          locations   jsonb,
          props       jsonb         not null,
          visits      jsonb         not null,
          primary key (id),
          unique (uuid),
          constraint unique_country_link unique (country_iso, link)
      );
  `
}

export const getCreateSchemaCycleOriginalDataPointViewDDL = (assessmentCycleSchemaName: string): string => {
  return `
      create or replace view ${assessmentCycleSchemaName}.original_data_point_data as
      with total_land_area as (select country_iso,
                                      r.props ->> 'variableName' as variable_name,
                                      r.props ->> 'tableName'    as table_name,
                                      r.props ->> 'colName'      as col_name,
                                      r.value ->> 'raw'          as value
                               from ${assessmentCycleSchemaName}.node_ext r
                               where type = 'node'
                                 and r.props ->> 'variableName' = 'totalLandArea'
                                 and r.props ->> 'tableName' = 'extentOfForest'),
           other_land as (select odp.country_iso,
                                 odp.year,
                                 case
                                     when (odp.values ->> 'forestArea')::numeric is not null or
                                          (odp.values ->> 'otherWoodedLand')::numeric is not null then
                                         (tla.value)::double precision -
                                         coalesce((odp.values ->> 'forestArea')::numeric, 0)::double precision -
                                         coalesce((odp.values ->> 'otherWoodedLand')::numeric, 0)::double precision
                                     else null
                                     end as other_land
                          from ${assessmentCycleSchemaName}.original_data_point odp
                                   left join total_land_area tla
                                             on odp.country_iso = tla.country_iso and odp.year::text = tla.col_name)
          select odp.country_iso,
                 odp.year,
                 (odp.values ->> 'forestArea')::numeric                     as forest_area,
                 (odp.values ->> 'otherWoodedLand')::numeric                as other_wooded_land,
                 (odp.values ->> 'naturalForestArea')::numeric              as natural_forest_area,
                 (odp.values ->> 'plantationForestArea')::numeric           as plantation_forest_area,
                 (odp.values ->> 'plantationForestIntroducedArea')::numeric as plantation_forest_introduced_area,
                 (odp.values ->> 'otherPlantedForestArea')::numeric         as other_planted_forest_area,
                 (odp.values ->> 'plantedForest')::numeric                  as planted_forest,
                 (odp.values ->> 'total')::numeric                          as total,
                 tla.value                                                  as total_land_area,
                 ol.other_land,
                 (odp.values ->> 'totalForestArea')::numeric                as total_forest_area,
                 (odp.values ->> 'primaryForest')::numeric                  as primary_forest,
                 odp.id
          from ${assessmentCycleSchemaName}.original_data_point odp
                   left join total_land_area tla on odp.country_iso = tla.country_iso and odp.year::text = tla.col_name
                   left join other_land ol on odp.country_iso = ol.country_iso and odp.year = ol.year
          order by odp.country_iso, odp.year
  `
}
