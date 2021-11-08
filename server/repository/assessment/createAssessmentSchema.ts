import { BaseProtocol, DB } from '@server/db'
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
  const query = `
  insert into assessment (props)
values ('${assessment.props}'::jsonb);

create schema assessment_${uuid};

create table assessment_${uuid}.cycle
(
    id   bigserial NOT NULL,
    uuid uuid    default uuid_generate_v4(),
    name varchar default '',
    PRIMARY KEY (id)
);

create table assessment_${uuid}.section
(
    id            bigserial NOT NULL,
    uuid          uuid  default uuid_generate_v4(),
    props         jsonb default '{}'::jsonb,
    assessment_id serial    not null references assessment (id),
    PRIMARY KEY (id)
);

create table assessment_${uuid}.table_section
(
    id         bigserial NOT NULL,
    uuid       uuid  default uuid_generate_v4(),
    props      jsonb default '{}'::jsonb,
    section_id serial    not null references assessment_${uuid}.section (id),
    PRIMARY KEY (id)
);


create table assessment_${uuid}.table
(
    id               bigserial NOT NULL,
    uuid             uuid  default uuid_generate_v4(),
    props            jsonb default '{}'::jsonb,
    table_section_id serial    not null references assessment_${uuid}.table_section (id),
    PRIMARY KEY (id)
);


create table assessment_${uuid}.row
(
    id       bigserial NOT NULL,
    uuid     uuid  default uuid_generate_v4(),
    props    jsonb default '{}'::jsonb,
    table_id serial    not null references assessment_${uuid}.table (id),
    PRIMARY KEY (id)
);

create table assessment_${uuid}.col
(
    id     bigserial NOT NULL,
    uuid   uuid  default uuid_generate_v4(),
    props  jsonb default '{}'::jsonb,
    row_id serial    not null references assessment_${uuid}.row (id),
    PRIMARY KEY (id)
);
`
  await client.query(query)

  return uuid
}
