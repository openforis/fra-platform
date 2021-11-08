import { BaseProtocol, DB, Schemas } from '@server/db'
import { Assessment } from '@core/meta/assessment'

export const createAssessmentSchema = async (
  params: {
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<string> => {
  const {
    assessment,
    assessment: { uuid },
  } = params

  const schemaName = Schemas.getName(assessment)

  const query = `
  insert into assessment (props)
values ('${assessment.props}'::jsonb);

create schema ${schemaName}};

create table ${schemaName}.cycle
(
    id   bigserial NOT NULL,
    uuid uuid    default uuid_generate_v4(),
    name varchar default '',
    PRIMARY KEY (id)
);

create table ${schemaName}.section
(
    id            bigserial NOT NULL,
    uuid          uuid  default uuid_generate_v4(),
    props         jsonb default '{}'::jsonb,
    assessment_id serial    not null references assessment (id),
    PRIMARY KEY (id)
);

create table ${schemaName}.table_section
(
    id         bigserial NOT NULL,
    uuid       uuid  default uuid_generate_v4(),
    props      jsonb default '{}'::jsonb,
    section_id serial    not null references ${schemaName}.section (id),
    PRIMARY KEY (id)
);


create table ${schemaName}.table
(
    id               bigserial NOT NULL,
    uuid             uuid  default uuid_generate_v4(),
    props            jsonb default '{}'::jsonb,
    table_section_id serial    not null references ${schemaName}.table_section (id),
    PRIMARY KEY (id)
);


create table ${schemaName}.row
(
    id       bigserial NOT NULL,
    uuid     uuid  default uuid_generate_v4(),
    props    jsonb default '{}'::jsonb,
    table_id serial    not null references ${schemaName}.table (id),
    PRIMARY KEY (id)
);

create table ${schemaName}.col
(
    id     bigserial NOT NULL,
    uuid   uuid  default uuid_generate_v4(),
    props  jsonb default '{}'::jsonb,
    row_id serial    not null references ${schemaName}.row (id),
    PRIMARY KEY (id)
);
`
  await client.query(query)

  return uuid
}
