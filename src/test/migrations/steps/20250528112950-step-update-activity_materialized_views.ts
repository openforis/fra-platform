import { Promises } from 'utils/promises'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { CountryActivityLogRepository } from 'server/repository/assessmentCycle/countryActivityLog'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)
  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const countries = await AreaController.getCountries({ assessment, cycle }, client)
      await Promise.all(
        countries.map(async (country) => {
          const { countryIso } = country
          await CountryActivityLogRepository.dropMaterializedView({ assessment, cycle, countryIso }, client)
          await CountryActivityLogRepository.createMaterializedView({ assessment, cycle, countryIso }, client)
        })
      )
    })
  })
}
