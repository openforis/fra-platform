import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

import { recreateCountryActivityLogViews } from './utils/recreateCountryActivityLogViews'

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      const params = { assessmentUuid: assessment.uuid, cycleUuid: cycle.uuid }

      await client.query(
        `
            update public.activity_log al
            set target = jsonb_strip_nulls(jsonb_build_object(
                    'id', to_jsonb((al.target ->> 'id')::bigint),
                    'topicUuid', to_jsonb((select mt.uuid
                                           from ${schemaCycle}.message_topic mt
                                           where mt.id = coalesce(al.target ->> 'topicId', al.target ->> 'issueId')::bigint))
                ))
            where al.assessment_uuid = $(assessmentUuid)
              and al.cycle_uuid = $(cycleUuid)
              and al.message in ('messageCreate', 'messageMarkDeleted')
        `,
        params
      )
    })
  })

  await recreateCountryActivityLogViews(client)
}
