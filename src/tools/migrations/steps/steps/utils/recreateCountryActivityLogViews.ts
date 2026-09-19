import { Promises } from 'utils/promises'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db/db'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'
import { Logger } from 'server/utils/logger'

const client = DB
export const recreateCountryActivityLogViews = async (): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const countries = await AreaController.getCountries({ assessment, cycle }, client)
      Logger.info(`Refreshing country activity log views for ${countries.length} countries`)

      await client.tx(async (tx) => {
        await Promises.each(countries, async ({ countryIso }) => {
          await CountryActivityLogRepository.dropMaterializedView({ assessment, cycle, countryIso }, tx)
          await CountryActivityLogRepository.createMaterializedView({ assessment, cycle, countryIso }, tx)
        })
      })
    })
  })
}
