import { Promises } from 'utils/promises'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'
import { Logger } from 'server/utils/logger'

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const countries = await AreaController.getCountries({ assessment, cycle }, client)
      Logger.info(`Refreshing country activity log views for ${countries.length} countries`)
      await Promise.all(
        countries.map(async ({ countryIso }) => {
          await CountryActivityLogRepository.dropMaterializedView({ assessment, cycle, countryIso }, client)
          await CountryActivityLogRepository.createMaterializedView({ assessment, cycle, countryIso }, client)
        })
      )
    })
  )
}
