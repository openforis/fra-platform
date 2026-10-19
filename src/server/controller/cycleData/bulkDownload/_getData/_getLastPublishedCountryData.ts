import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Cycle, CycleName } from 'meta/assessment/cycle'

type Props<T extends Record<string, unknown>> = {
  assessment: Assessment
  cycleCountries: Record<CycleName, Array<CountryIso>>
  fetchFn: (assessment: Assessment, countryISOs: Array<CountryIso>, cycle: Cycle) => Promise<T>
}

// Fetches data per cycle group and merges results (keyed by CountryIso)
export const _getLastPublishedCountryData = async <T extends Record<string, unknown>>(props: Props<T>): Promise<T> => {
  const { assessment, cycleCountries, fetchFn } = props

  const dataArray = await Promise.all(
    Object.entries(cycleCountries).map(async ([cycleName, countryIsos]) => {
      const cycle = Assessments.getCycle({ assessment, cycleName: cycleName as CycleName })
      return fetchFn(assessment, countryIsos, cycle)
    })
  )

  return dataArray.reduce<T>((acc, data) => ({ ...acc, ...data }), {} as T)
}
