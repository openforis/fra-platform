import '../scriptInit'

import { CountryIso } from 'meta/area/countryIso'
import { Promises } from 'utils/promises'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'

import { validateDescriptions } from './descriptions'
import { validateNationalDataPoints } from './nationalDataPoints'
import { validateTables } from './tables'
import { Failure } from './types'

const _throwIfFailed = (failures: Array<Failure>): void => {
  if (failures.length === 0) return
  const _mapFn = (failure: Failure): string => {
    const { assessmentName, countryIso, cycleName, error } = failure
    const errorMessage = error instanceof Error ? error.message : String(error)
    return `- ${assessmentName}/${cycleName}/${countryIso}: ${errorMessage}`
  }

  const summary = failures.map(_mapFn).join('\n')
  throw new Error(`validateAll failed for ${failures.length} countries:\n${summary}`)
}

export const validateAll = async (client: BaseProtocol = DB): Promise<void> => {
  const assessments = await AssessmentController.getAll({ metaCache: true }, client)
  const assessmentCycles = assessments.flatMap((assessment) =>
    assessment.cycles.map((cycle) => ({ assessment, cycle }))
  )
  const failures: Array<Failure> = []

  await Promises.each(assessmentCycles, async ({ assessment, cycle }) => {
    const countriesMap = await AreaController.getCountriesMap({ assessment, cycle }, client)
    const countryISOs = Object.keys(countriesMap) as Array<CountryIso>
    const countries = Object.values(countriesMap)

    const descriptionsByCountry = await DescriptionRepository.getValues({ assessment, countryISOs, cycle }, client)

    await Promises.each(countries, async (country) => {
      const promises = [
        validateDescriptions({ assessment, country, cycle, descriptionsByCountry }, client),
        validateTables({ assessment, country, cycle }, client),
      ]

      if (cycle.props.ndp) {
        promises.push(validateNationalDataPoints({ assessment, country, cycle }, client))
      }

      const results = await Promise.all(promises)
      failures.push(...results.flat())
    })
  })

  _throwIfFailed(failures)
}

if (require.main === module) {
  ToolsUtils.exec(validateAll)
}
