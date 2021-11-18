import { BaseProtocol, DB, Schemas } from '@server/db'
import { Assessment } from '@core/meta/assessment'

export const createAssessmentSchema = async (
  params: {
    assessment: Pick<Assessment, 'props'>
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
      country_iso      varchar(3) references public.country,
      section          varchar(250)                                   not null,
      target           json,
      id               bigserial                                      not null,
      user_id bigint not null references public.users (id) on delete cascade
  );

  create table ${schemaName}.assessment_country
  (
      country_iso varchar(3) not null
          constraint assessment_country_fk
              references country
              on update cascade on delete cascade,
      unique (country_iso)
  );
  
  create table ${schemaName}.assessment_region
  (
      region_code varchar
          constraint assessment_region_region_region_code_fk
              references region
              on update cascade on delete cascade,
      unique (region_code)
  );
  
  create table ${schemaName}.assessment_region_group
  (
      region_group_id bigint
          constraint assessment_region_group_fk
              references region_group
              on update cascade on delete cascade,
      unique (region_group_id)
  );
`

  await client.query(query)

  return schemaName
}
