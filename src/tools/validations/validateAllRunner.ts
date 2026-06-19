import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Promises } from 'utils/promises'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { validateCountryDescriptions } from 'server/controller/cycleData/validations/descriptions/validateCountryDescriptions'
import { validateCountryNationalDataPoints } from 'server/controller/cycleData/validations/nationalDataPoint/validateCountryNationalDataPoints'
import { validateCountryTables } from 'server/controller/cycleData/validations/tables/validateCountryTables/validateCountryTables'
import { BaseProtocol, DB } from 'server/db/db'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { Logger } from 'server/utils/logger'

type Failure = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  error: unknown
}

const _getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}

const _getFailureSummary = (failures: Array<Failure>): string =>
  failures
    .map(({ assessmentName, countryIso, cycleName, error }) => {
      return `- ${assessmentName}/${cycleName}/${countryIso}: ${_getErrorMessage(error)}`
    })
    .join('\n')

export const validateAll = async (client: BaseProtocol = DB): Promise<void> => {
  const failures: Array<Failure> = []
  let processedCountries = 0

  const assessments = await AssessmentController.getAll({ metaCache: true }, client)

  await Promises.each(assessments, async (assessment) => {
    const { name: assessmentName } = assessment.props

    await Promises.each(assessment.cycles, async (cycle) => {
      const cycleName = cycle.name
      Logger.info(`Validating ${assessmentName}/${cycleName}`)

      const countries = await AreaController.getCountries({ assessment, cycle }, client)

      const countryISOs = countries.map<CountryIso>(({ countryIso }) => countryIso)
      const descriptionsByCountry = await DescriptionRepository.getValues({ assessment, countryISOs, cycle }, client)

      await Promises.each(countries, async (country, index) => {
        const { countryIso } = country
        const progress = `${index + 1}/${countries.length}`

        Logger.info(`Validating ${assessmentName}/${cycleName}/${countryIso} (${progress})`)
        processedCountries += 1

        try {
          await Promise.all([
            validateCountryTables({ assessmentName, countryIso, cycleName }, client),
            validateCountryDescriptions({ assessment, country, cycle, descriptionsByCountry }),
            validateCountryNationalDataPoints({ assessment, country, cycle }, client),
          ])
        } catch (error) {
          failures.push({ assessmentName, countryIso, cycleName, error })
          Logger.error(`Validation failed for ${assessmentName}/${cycleName}/${countryIso}: ${_getErrorMessage(error)}`)
        }
      })
    })
  })

  Logger.info(
    `Validation rollout completed. Processed countries: ${processedCountries}. Failed countries: ${failures.length}.`
  )

  if (failures.length > 0) {
    throw new Error(`Validation rollout failed for ${failures.length} countries:\n${_getFailureSummary(failures)}`)
  }
}
