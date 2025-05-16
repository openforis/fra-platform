export const getCreateMeasurementSchemaDDL = (schemaName = 'measurement'): string => {
  return `
    create schema if not exists ${schemaName};

    create table if not exists ${schemaName}.unit (
      id bigserial primary key,
      uuid uuid not null default uuid_generate_v4(),
      name varchar not null,
      symbol varchar not null
    );
    create unique index if not exists unit_uuid_key on ${schemaName}.unit using btree (uuid);

    create table if not exists ${schemaName}.system_of_measurement (
      id bigserial primary key,
      uuid uuid not null default uuid_generate_v4(),
      name varchar not null,
      conversion_factors jsonb not null default '{}'::jsonb,
      base_unit_uuid uuid not null,

      foreign key (base_unit_uuid) references ${schemaName}.unit (uuid) on update cascade on delete cascade
    );
    create unique index if not exists system_of_measurement_uuid_key on ${schemaName}.system_of_measurement using btree (uuid);

    create table if not exists ${schemaName}.measure (
      id bigserial primary key,
      uuid uuid not null default uuid_generate_v4(),
      name varchar not null,
      system_uuid uuid not null,

      foreign key (system_uuid) references ${schemaName}.system_of_measurement (uuid) on update cascade on delete cascade
    );
    create unique index if not exists measure_uuid_key on ${schemaName}.measure using btree (uuid);

    create table if not exists ${schemaName}.dimension (
      id bigserial primary key,
      uuid uuid not null default uuid_generate_v4(),
      name varchar not null
    );
    create unique index if not exists dimension_uuid_key on ${schemaName}.dimension (uuid);
  `
}
