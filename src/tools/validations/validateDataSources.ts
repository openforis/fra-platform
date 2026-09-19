import '../scriptInit'

import { CountryIso } from 'meta/area/countryIso'
import { Promises } from 'utils/promises'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AreaController } from 'server/controller/area'
import { BaseProtocol, DB } from 'server/db/db'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { Logger } from 'server/utils/logger'

import { Failures } from './common/failures'
import { getAssessmentCycles } from './common/getAssessmentCycles'
import { Failure } from './common/types'
import { validateCycleCountries } from './common/validateCycleCountries'
import { validateCountryDataSources } from './dataSources/validateCountryDataSources'

const toolName = 'validateDataSources'

export const validateDataSources = async (client: BaseProtocol = DB): Promise<Array<Failure>> => {
  const failures: Array<Failure> = []
  const assessmentCycles = await getAssessmentCycles(client)

  await Promises.each(assessmentCycles, async ({ assessment, cycle }) => {
    Logger.info(`${toolName}: ${assessment.props.name}/${cycle.name}`)

    const countries = await AreaController.getCountries({ assessment, cycle }, client)
    const descriptionsByCountry = await DescriptionRepository.getValues(
      { assessment, countryISOs: countries.map<CountryIso>(({ countryIso }) => countryIso), cycle },
      client
    )

    const cycleFailures = await validateCycleCountries({ assessment, countries, cycle, toolName }, (country) =>
      validateCountryDataSources({ assessment, country, cycle, descriptionsByCountry })
    )
    failures.push(...cycleFailures)
  })

  return failures
}

if (require.main === module) {
  ToolsUtils.exec(async () => Failures.throwIfFailed(toolName, await validateDataSources()))
}
