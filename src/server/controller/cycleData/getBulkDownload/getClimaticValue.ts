import { CountryIso } from 'meta/area/countryIso'
import { RecordCountryData } from 'meta/data/recordData'

export const getClimaticValue = (
  name: string,
  countryIso: CountryIso,
  climaticData: RecordCountryData
): string | undefined => {
  const { climaticDomain } = climaticData[countryIso]

  return (
    climaticDomain?.percentOfForestArea2015?.[name]?.raw ?? climaticDomain?.percentOfForestArea2015Default?.[name]?.raw
  )
}
