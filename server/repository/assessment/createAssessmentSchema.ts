import { BaseProtocol, DB, Schemas } from '@server/db'
import { Assessment } from '@core/meta/assessment'

export const createAssessmentSchema = async (
  params: {
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<string> => {
  const { assessment } = params

  const schemaName = Schemas.getName(assessment)

  const query = `
  create schema ${schemaName};

create table ${schemaName}.cycle
(
    id   bigserial NOT NULL,
    uuid uuid    default uuid_generate_v4(),
    name varchar default '',
    PRIMARY KEY (id),
    unique(uuid)
);

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
      country_iso      varchar(3),
      section          varchar(250)                                   not null,
      target           json,
      id               bigserial                                      not null,
      user_id bigint not null references public.fra_user (id)
  );

`

  await client.query(query)

  return schemaName
}
