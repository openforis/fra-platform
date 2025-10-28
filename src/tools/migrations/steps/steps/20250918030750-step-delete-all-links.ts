import { Promises } from 'utils/promises'

import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { AssessmentController } from 'server/controller/assessment'

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      await client.query(`truncate table ${schemaCycle}.link`)
    })
  )
}
