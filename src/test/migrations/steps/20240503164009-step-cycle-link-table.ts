import { Promises } from 'utils/promises'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'

// Don't use transaction when handling DDL
const client: BaseProtocol = DB

export default async () => {
  const assessments = await AssessmentRepository.getAll({}, client)

  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      await client.query(`
      create table if not exists ${schemaCycle}.link
      (
          id          bigserial     not null,
          uuid        uuid          not null default uuid_generate_v4(),
          country_iso varchar(3)    references public.country (country_iso) on update cascade on delete cascade,
          link        varchar(2048) not null,
          location    jsonb         not null,
          props       jsonb         not null,
          target      varchar(8)    not null,
          primary key (id),
          unique (uuid)
      );
    `)
    })
  )
}
