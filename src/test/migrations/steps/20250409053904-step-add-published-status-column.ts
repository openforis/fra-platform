import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({ metaCache: true }, client)

  const schemas: Array<string> = assessments.flatMap((assessment) =>
    assessment.cycles.map((cycle) => Schemas.getNameCycle(assessment, cycle))
  )

  await Promises.each(schemas, async (schemaName) => {
    await client.query(`alter table ${schemaName}.country add column last_in_published timestamptz;`)
  })
}
