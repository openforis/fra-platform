import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { CountrySummaryRepository } from 'server/repository/assessmentCycle/countrySummary'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      await CountrySummaryRepository.dropMaterializedView({ assessment, cycle })
      await CountrySummaryRepository.createMaterializedView({ assessment, cycle })
    })
  )
}
