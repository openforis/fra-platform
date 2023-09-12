import { CountryIso } from 'meta/area'
import { RecordCountryData } from 'meta/data'

export const getClimaticValue = (name: string, countryIso: CountryIso, climaticData: RecordCountryData) => {
  const { climaticDomain } = climaticData[countryIso]
  return climaticDomain.percentOfForestArea2015?.[name].raw ?? climaticDomain.percentOfForestArea2015Default?.[name].raw
}
