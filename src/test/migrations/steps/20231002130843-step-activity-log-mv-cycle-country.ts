import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { CountryActivityLog } from 'server/repository/assessmentCycle/countryActivityLog'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map(async (assessment) => {
      await Promise.all(
        assessment.cycles.map(async (cycle) => {
          const countries = await AreaController.getCountries({ assessment, cycle }, client)
          await Promise.all(
            countries.map(async (country) => {
              await CountryActivityLog.createMaterializedView(
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
