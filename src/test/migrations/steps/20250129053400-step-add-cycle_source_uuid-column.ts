import { Objects } from 'utils/objects'

import { CycleName } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db'

const mapping: Record<CycleName, CycleName> = {
  '2025': '2020',
  latest: '2025',
}

export default async (client: BaseProtocol) => {
  await DB.query(`
      alter table public.assessment_cycle
          add cycle_uuid_source uuid
              constraint assessment_cycle_assessment_cycle_source_fk
                  references public.assessment_cycle (uuid)
                  on update cascade on delete set null;
  `)

  const assessments = await AssessmentController.getAll({}, client)
  await Promise.all(
    assessments.map((assessment) =>
      Promise.all(
        assessment.cycles.map((cycle) => {
          const cycleNameSource = mapping[cycle.name]

          if (Objects.isEmpty(cycleNameSource)) return Promise.resolve()

          const cycleSource = assessment.cycles.find((c) => c.name === cycleNameSource)

          return client.query(
            `update public.assessment_cycle
             set cycle_uuid_source = $2
             where uuid = $1
            `,
            [cycle.uuid, cycleSource.uuid]
          )
        })
      )
    )
  )
}
