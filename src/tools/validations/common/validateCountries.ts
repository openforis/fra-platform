import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

import { Failure } from './types'

export type CountryProps = {
  assessment: Assessment
  country: Country
  cycle: Cycle
}

type Props = {
  shouldValidateCycle?: (cycle: Cycle) => boolean
  toolName: string
  validateCountry: (props: CountryProps, client: BaseProtocol) => Promise<void>
}

// Util to validate multiple countries - validator passed from outside
export const validateCountries = async (props: Props, client: BaseProtocol = DB): Promise<Array<Failure>> => {
  const { shouldValidateCycle, toolName, validateCountry } = props
  const failures: Array<Failure> = []
  const assessments = await AssessmentController.getAll({ metaCache: true }, client)
  const assessmentCycles = assessments.flatMap((assessment) =>
    assessment.cycles.map((cycle) => ({ assessment, cycle }))
  )

  await Promise.all(
    assessmentCycles.map(async ({ assessment, cycle }) => {
      // skip NDP validations
      if (shouldValidateCycle && !shouldValidateCycle(cycle)) return

      const assessmentName = assessment.props.name
      const { name: cycleName } = cycle
      Logger.info(`${toolName}: ${assessmentName}/${cycleName}`)

      const countries = await AreaController.getCountries({ assessment, cycle }, client)

      await Promise.all(
        countries.map(async (country) => {
          const { countryIso } = country

          try {
            await validateCountry({ assessment, country, cycle }, client)
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
