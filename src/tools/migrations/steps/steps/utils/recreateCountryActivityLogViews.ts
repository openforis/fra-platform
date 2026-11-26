import { Promises } from 'utils/promises'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

export const dropCountryActivityLogViews = async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const countries = await AreaController.getCountries({ assessment, cycle }, client)
      Logger.info(`Dropping country activity log views for ${countries.length} countries`)
      await Promise.all(
        countries.map(({ countryIso }) =>
          CountryActivityLogRepository.dropMaterializedView({ assessment, cycle, countryIso }, client)
        )
      )
      // Drop stray view
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      await client.query(`drop materialized view if exists ${schemaCycle}."activity_log_undefined"`)
    })
  )
}

export const createCountryActivityLogViews = async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const countries = await AreaController.getCountries({ assessment, cycle }, client)
      Logger.info(
        `Creating country activity log views for ${assessment.props.name} ${cycle.name} ${countries.length} countries`
      )
      await Promise.all(
        countries.map(({ countryIso }) =>
          CountryActivityLogRepository.createMaterializedView({ assessment, cycle, countryIso }, client)
        )
      )
    })
  )
}

export const recreateCountryActivityLogViews = async (client: BaseProtocol): Promise<void> => {
  await dropCountryActivityLogViews(client)
  await createCountryActivityLogViews(client)
}
