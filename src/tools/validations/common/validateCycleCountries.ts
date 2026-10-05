import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Promises } from 'utils/promises'

import { Logger } from 'server/utils/logger'

import { Failure } from './types'

const countryValidationConcurrency = 8

type Props = {
  assessment: Assessment
  countries: Array<Country>
  cycle: Cycle
  toolName: string
}

// Runs validateCountry over all countries at fixed concurrency, recording per-country errors as failures.
export const validateCycleCountries = async (
  props: Props,
  validateCountry: (country: Country) => Promise<void>
): Promise<Array<Failure>> => {
  const { assessment, countries, cycle, toolName } = props
  const assessmentName = assessment.props.name
  const { name: cycleName } = cycle

  const failures: Array<Failure> = []

  await Promises.pool(
    countries,
    async (country) => {
      const { countryIso } = country

      try {
        await validateCountry(country)
      } catch (error) {
        Logger.error(`${toolName} failed for ${assessmentName}/${cycleName}/${countryIso}`)
        failures.push({ assessmentName, countryIso, cycleName, error })
      }
    },
    countryValidationConcurrency
  )

  return failures
}
