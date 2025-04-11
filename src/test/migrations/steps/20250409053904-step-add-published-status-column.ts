import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol, DB, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    return Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)

      await DB.query(`alter table ${schemaName}.country add column last_in_published timestamptz;`)
      await CacheController.generateArea({ assessment, cycle }, client)
    })
  })
}
