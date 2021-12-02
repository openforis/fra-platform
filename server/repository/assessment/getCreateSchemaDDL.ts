export const getCreateSchemaDDL = (schemaName: string): string => {
  const query = `
  create schema ${schemaName};

create table ${schemaName}.section
(
    id            bigserial NOT NULL,
    uuid          uuid  default uuid_generate_v4(),
    props         jsonb default '{}'::jsonb,
    assessment_id bigint   not null references assessment (id),
    PRIMARY KEY (id),
    unique(uuid)
);

create table ${schemaName}.table_section
(
    id         bigserial NOT NULL,
    uuid       uuid  default uuid_generate_v4(),
    props      jsonb default '{}'::jsonb,
    section_id bigint   not null references ${schemaName}.section (id),
    PRIMARY KEY (id),
    unique(uuid)
);


create table ${schemaName}.table
(
    id               bigserial NOT NULL,
    uuid             uuid  default uuid_generate_v4(),
    props            jsonb default '{}'::jsonb,
    table_section_id bigint   not null references ${schemaName}.table_section (id),
    PRIMARY KEY (id),
    unique(uuid)
);


create table ${schemaName}.row
(
    id       bigserial NOT NULL,
    uuid     uuid  default uuid_generate_v4(),
    props    jsonb default '{}'::jsonb,
    table_id bigint   not null references ${schemaName}.table (id),
    PRIMARY KEY (id),
    unique(uuid)
);

create table ${schemaName}.col
(
    id     bigserial NOT NULL,
    uuid   uuid  default uuid_generate_v4(),
    props  jsonb default '{}'::jsonb,
    row_id bigint   not null references ${schemaName}.row (id),
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
      user_id bigint not null references public.users (id) on delete cascade
  );

  create table ${schemaName}.country
  (
      country_iso varchar(3) not null
          constraint country_fk
              references country
              on update cascade on delete cascade,
      unique (country_iso)
  );
 
  create table ${schemaName}.region_group
  (
      id bigserial not null constraint region_group_pkey primary key,
      name varchar not null,
      "order" integer not null
  );
 
  create table ${schemaName}.region
  (
    region_group_id bigint references ${schemaName}.region_group (id),
    region_code varchar
          constraint assessment_region_region_region_code_fk
              references region
              on update cascade on delete cascade,
      unique (region_code, region_group_id)
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
          row_id bigint                           not null
              constraint node_row_id_fk
                  references ${assessmentSchemaName}.row (id)
                  on update cascade on delete cascade,
          col_id bigint                           not null
              constraint node_col_id_fk
                  references ${assessmentSchemaName}.col (id)
                  on update cascade on delete cascade,
          value  jsonb default '{}'::jsonb        not null
      );

      create unique index node_uuid_uindex
          on ${assessmentCycleSchemaName}.node (uuid);
  `
}
