export const getCreateSchemaDDL = (schemaName: string): string => {
  const query = `
      create schema ${schemaName};

      create table ${schemaName}.cycle
      (
          id   bigserial NOT NULL,
          uuid uuid    default uuid_generate_v4(),
          name varchar default '',
          PRIMARY KEY (id),
          unique (uuid)
      );

      create table ${schemaName}.section
      (
          id            bigserial NOT NULL,
          uuid          uuid  default uuid_generate_v4(),
          props         jsonb default '{}'::jsonb,
          assessment_id bigint    not null references assessment (id),
          PRIMARY KEY (id),
          unique (uuid)
      );

      create table ${schemaName}.table_section
      (
          id         bigserial NOT NULL,
          uuid       uuid  default uuid_generate_v4(),
          props      jsonb default '{}'::jsonb,
          section_id bigint    not null references ${schemaName}.section (id),
          PRIMARY KEY (id),
          unique (uuid)
      );


      create table ${schemaName}.table
      (
          id               bigserial NOT NULL,
          uuid             uuid  default uuid_generate_v4(),
          props            jsonb default '{}'::jsonb,
          table_section_id bigint    not null references ${schemaName}.table_section (id),
          PRIMARY KEY (id),
          unique (uuid)
      );


      create table ${schemaName}.row
      (
          id       bigserial NOT NULL,
          uuid     uuid  default uuid_generate_v4(),
          props    jsonb default '{}'::jsonb,
          table_id bigint    not null references ${schemaName}.table (id),
          PRIMARY KEY (id),
          unique (uuid)
      );

      create table ${schemaName}.col
      (
          id     bigserial NOT NULL,
          uuid   uuid  default uuid_generate_v4(),
          props  jsonb default '{}'::jsonb,
          row_id bigint    not null references ${schemaName}.row (id),
          PRIMARY KEY (id),
          unique (uuid)
      );
  `
  return query
}
