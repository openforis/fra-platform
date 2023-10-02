import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { ActivityLogRepository } from 'server/repository/assessmentCycle/activityLog'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map(async (assessment) => {
      await Promise.all(
        assessment.cycles.map(async (cycle) => {
          const countries = await AreaController.getCountries({ assessment, cycle }, client)
          await Promise.all(
            countries.map(async (country) => {
              await ActivityLogRepository.createMaterializedView(
                { assessment, cycle, countryIso: country.countryIso },
                client
              )
            })
          )
        })
      )
    })
  )
}
