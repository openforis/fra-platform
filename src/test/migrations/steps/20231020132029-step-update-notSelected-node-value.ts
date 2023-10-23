import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({ metaCache: true }, client)

  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, (cycle) => {
      const schema = Schemas.getNameCycle(assessment, cycle)
      return client.query(`
          update ${schema}.node n
          set value = jsonb_build_object('raw', '')
          where n.id in (select n.id
                         from ${schema}.node n
                         where n.value ->> 'raw' = 'notSelected')`)
    })
  )

  await Promise.all(
    assessments.map(async (assessment) =>
      Promise.all(
        assessment.cycles.map(async (cycle) =>
          AssessmentController.generateDataCache({ assessment, cycle, force: true })
        )
      )
    )
  )
}
