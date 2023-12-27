import { Promises } from 'utils/promises'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { CountryActivityLogRepository } from 'server/repository/assessmentCycle/countryActivityLog'
import { Logger } from 'server/utils/logger'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const countries = await AreaController.getCountries({ assessment, cycle }, client)
      await Promises.each(countries, async ({ countryIso }) => {
        await CountryActivityLogRepository.dropMaterializedView({ assessment, cycle, countryIso }, client)
        Logger.info(`Generating activity log view ${assessment.props.name} ${cycle.name} ${countryIso}`)
        await CountryActivityLogRepository.createMaterializedView({ assessment, cycle, countryIso }, client)
      })
    })
  )
}
