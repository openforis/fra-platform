import '../scriptInit'

import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import {
  CommentableDescription,
  CommentableDescriptionName,
  DescriptionCountryValues,
} from 'meta/assessment/descriptionValue'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { DataValidationService } from 'server/service/dataValidation'
import { Logger } from 'server/utils/logger'

import { Failures } from './common/failures'
import { Failure } from './common/types'

const toolName = 'validateDataSources'

type CountryProps = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptionsByCountry: DescriptionCountryValues
}

const _validateCountry = async (props: CountryProps): Promise<void> => {
  const { assessment, country, cycle, descriptionsByCountry } = props
  const { countryIso } = country

  const descriptions = Object.entries(descriptionsByCountry[countryIso] ?? {}).flatMap<
    Omit<CommentableDescription, 'id'>
  >(([sectionName, sectionValues]) =>
    Object.entries(sectionValues).map<Omit<CommentableDescription, 'id'>>(([name, value]) => ({
      countryIso,
      name: name as CommentableDescriptionName,
      sectionName,
      value,
    }))
  )

  await DataValidationService.validateDataSources({ assessment, country, cycle, descriptions, notifyClients: false })
}

export const validateDataSources = async (client: BaseProtocol = DB): Promise<Array<Failure>> => {
  const failures: Array<Failure> = []
  const assessments = await AssessmentController.getAll({ metaCache: true }, client)
  const assessmentCycles = assessments.flatMap((assessment) =>
    assessment.cycles.map((cycle) => ({ assessment, cycle }))
  )

  await Promise.all(
    assessmentCycles.map(async ({ assessment, cycle }) => {
      const assessmentName = assessment.props.name
      const { name: cycleName } = cycle
      Logger.info(`${toolName}: ${assessmentName}/${cycleName}`)

      const countries = await AreaController.getCountries({ assessment, cycle }, client)
      const descriptionsByCountry = await DescriptionRepository.getValues(
        { assessment, countryISOs: countries.map<CountryIso>(({ countryIso }) => countryIso), cycle },
        client
      )

      await Promise.all(
        countries.map(async (country) => {
          const { countryIso } = country

          try {
            await _validateCountry({ assessment, country, cycle, descriptionsByCountry })
          } catch (error) {
            Logger.error(`${toolName} failed for ${assessmentName}/${cycleName}/${countryIso}`)
            failures.push({ assessmentName, countryIso, cycleName, error })
          }
        })
      )
    })
  )

  return failures
}

if (require.main === module) {
  ToolsUtils.exec(async () => Failures.throwIfFailed(toolName, await validateDataSources()))
}
