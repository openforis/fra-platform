import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { CountryUserSummaryRepository } from 'server/repository/assessmentCycle/countryUserSummary'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map((assessment) =>
      Promise.all(
        assessment.cycles.map(async (cycle) => {
          await CountryUserSummaryRepository.createOrReplaceView({ assessment, cycle }, client)
        })
      )
    )
  )
}
