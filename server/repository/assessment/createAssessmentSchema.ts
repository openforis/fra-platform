import { BaseProtocol, DB } from '@server/db'

export const createAssessmentSchema = async (
  params: {
    id: string
    name: string
  },
  client: BaseProtocol = DB
): Promise<string> => {
  const { id, name } = params
  const query = `
  insert into assessment (props)
values ('{
  "name": "${name}"
}'::jsonb);

create schema assessment_${id};

create table assessment_${id}.cycle
(
    id   bigserial NOT NULL,
    uuid uuid    default uuid_generate_v4(),
    name varchar default '',
    PRIMARY KEY (id)
);

create table assessment_${id}.section
(
    id            bigserial NOT NULL,
    uuid          uuid  default uuid_generate_v4(),
    props         jsonb default '{}'::jsonb,
    assessment_id serial    not null references assessment (id),
    PRIMARY KEY (id)
);

create table assessment_${id}.table_section
(
    id         bigserial NOT NULL,
    uuid       uuid  default uuid_generate_v4(),
    props      jsonb default '{}'::jsonb,
    section_id serial    not null references assessment_${id}.section (id),
    PRIMARY KEY (id)
);


create table assessment_${id}.table
(
    id               bigserial NOT NULL,
    uuid             uuid  default uuid_generate_v4(),
    props            jsonb default '{}'::jsonb,
    table_section_id serial    not null references assessment_${id}.table_section (id),
    PRIMARY KEY (id)
);


create table assessment_${id}.row
(
    id       bigserial NOT NULL,
    uuid     uuid  default uuid_generate_v4(),
    props    jsonb default '{}'::jsonb,
    table_id serial    not null references assessment_${id}.table (id),
    PRIMARY KEY (id)
);

create table assessment_${id}.col
(
    id     bigserial NOT NULL,
    uuid   uuid  default uuid_generate_v4(),
    props  jsonb default '{}'::jsonb,
    row_id serial    not null references assessment_${id}.row (id),
    PRIMARY KEY (id)
);
`
  await client.query(query)

  return id
}
