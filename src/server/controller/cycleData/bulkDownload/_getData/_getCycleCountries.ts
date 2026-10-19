import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'

import { AreaController } from 'server/controller/area'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
}

// Groups countries by their last published cycle name: { 'latest': ['X01'...] }
export const _getCycleCountries = async (props: Props): Promise<Record<CycleName, Array<CountryIso>>> => {
  const { assessment, countryISOs, cycle } = props
  const countriesMap = await AreaController.getCountriesMap({ assessment, cycle })

  return countryISOs.reduce<Record<CycleName, Array<CountryIso>>>((acc, countryIso) => {
    const country = countriesMap[countryIso]
    const { cycleName } = country.lastPublishedInfo
    if (!acc[cycleName]) acc[cycleName] = []
    acc[cycleName].push(countryIso)
    return acc
  }, {})
}
