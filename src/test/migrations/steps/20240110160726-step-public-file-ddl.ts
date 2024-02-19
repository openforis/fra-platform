import { Promises } from 'utils/promises'

import { AssessmentNames } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'

// Don't use transaction when handling DDL
const client: BaseProtocol = DB

export default async () => {
  // 1. Create new table public.file
  await client.query(`
        create table if not exists public.file
          (
            id         bigserial    not null,
            uuid       uuid         not null default uuid_generate_v4(),
            name       varchar(255) not null,
            file       bytea        not null,
            created_at timestamp    not null default now(),
            primary key (id),
            unique (uuid)
          );
  `)

  // 2. For each assessment/schema, create repository
  const assessments = await AssessmentRepository.getAll({}, client)

  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      await client.query(`
      create table if not exists ${schemaCycle}.repository
      (
          id          bigserial     not null,
          uuid        uuid          not null default uuid_generate_v4(),
          country_iso varchar(3) references public.country (country_iso) on update cascade on delete cascade,
          file_uuid   uuid references public.file (uuid) on update cascade on delete cascade,
          link        varchar(2048),
          props       jsonb         not null,
          primary key (id),
          unique (uuid)
      );
    `)
    })
  )

  // 3. Migrate all existing files to new file table
  await client.query(`
      insert into public.file (uuid, name, file)
      select f.uuid, f.file_name, f.file
      from assessment_fra.file f;
  `)

  const assessmentFRA = assessments.find((assessment) => assessment.props.name === AssessmentNames.fra)
  const cycle2025 = assessmentFRA.cycles.find((cycle) => cycle.name === '2025')
  const cycle2020 = assessmentFRA.cycles.find((cycle) => cycle.name === '2020')

  // 4. Migrate metadata for 2025
  await client.query(`
      insert into ${Schemas.getNameCycle(assessmentFRA, cycle2025)}.repository (country_iso, file_uuid, props)
      select country_iso, uuid, jsonb_build_object('props', props, 'translations', jsonb_build_object('en', file_name))
      from assessment_fra.file;
  `)

  // 5. Migrate metadata for 2020
  await client.query(`
      insert into ${Schemas.getNameCycle(assessmentFRA, cycle2020)}.repository (country_iso, file_uuid, props)
      select r.country_iso,
             f.uuid,
              jsonb_build_object('props', af.props, 'translations', jsonb_build_object('en', f.name))
      from _legacy.repository r
               inner join public.file f on r.file_name = f.name
               left join assessment_fra.file af using (uuid)
         `)

  // 6. Drop unused tables
  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      await client.query(`
            drop table if exists ${schemaCycle}.file;
        `)
    })
  )
}