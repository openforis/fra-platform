import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    return Promises.each(assessment.cycles, async (cycle) => {
      await CacheController.generateArea({ assessment, cycle }, client)
    })
  })
}
