import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { CountrySummaryRepository } from 'server/repository/assessmentCycle/countrySummary'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map((assessment) =>
      Promise.all(
        assessment.cycles.map((cycle) => CountrySummaryRepository.createMaterializedView({ assessment, cycle }, client))
      )
    )
  )
}
