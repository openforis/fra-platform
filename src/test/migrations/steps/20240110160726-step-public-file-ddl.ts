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
            file_name  varchar(255) not null,
            file       bytea        not null,
            created_at timestamp    not null default now(),
            updated_at timestamp,
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
          name        varchar(2048) not null,
          props       jsonb,
          primary key (id),
          unique (uuid)
      );
    `)
    })
  )

  // 3. Migrate all existing files to new file table
  await client.query(`
      insert into public.file (uuid, file_name, file)
      select uuid, file_name, file
      from assessment_fra.file;
  `)

  const assessmentFRA = assessments.find((assessment) => assessment.props.name === AssessmentNames.fra)
  const cycle2025 = assessmentFRA.cycles.find((cycle) => cycle.name === '2025')
  const cycle2020 = assessmentFRA.cycles.find((cycle) => cycle.name === '2020')

  // 4. Migrate metadata for 2025
  await client.query(`
      insert into ${Schemas.getNameCycle(assessmentFRA, cycle2025)}.repository (country_iso, file_uuid, name, props)
      select country_iso, uuid, file_name, props
      from assessment_fra.file;
  `)

  // 5. Migrate metadata for 2020
  await client.query(`
      insert into ${Schemas.getNameCycle(assessmentFRA, cycle2020)}.repository (country_iso, file_uuid, name, props)
      select r.country_iso,
             f.uuid,
             r.file_name,
             af.props
      from _legacy.repository r
               inner join public.file f using (file_name)
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
