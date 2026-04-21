import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  const promises = assessments.flatMap((assessment) =>
    assessment.cycles.map((cycle) => {
      const schema = Schemas.getNameCycle(assessment, cycle)
      const query = `update ${schema}.repository r
                     set created_at = al.time
                     from public.activity_log al
                     where al.message = 'repositoryItemCreate'
                       and al.cycle_uuid = $(cycleUuid)
                       and al.target->>'uuid' = r.uuid::text`
      return client.none(query, { cycleUuid: cycle.uuid })
    })
  )

  await Promise.all(promises)
}
