import { CountryIso } from '@meta/area'

import { climaticDomain } from '@server/controller/cycleData/getBulkDownload/climaticDomain'
import { Props } from '@server/controller/cycleData/getBulkDownload/props'
import { getTableData } from '@server/controller/cycleData/getTableData'

export const AnnualData = async (props: Props) => {
  const { assessment, cycle, countries } = props
  const climaticData = await climaticDomain(props)
  const tableNames = ['disturbances', 'areaAffectedByFire']
  const tableData = await getTableData({
    assessment,
    cycle,
    countryISOs: countries.map(({ countryIso }) => countryIso),
    tableNames: ['disturbances', 'areaAffectedByFire'],
    columns: [],
    mergeOdp: false,
    aggregate: false,
    variables: [],
  })

  // Unique years
  const years = new Array(
    ...new Set(
      countries.flatMap((country) =>
        tableNames.flatMap((tableName) => Object.keys(tableData[country.countryIso]?.[tableName] ?? {}))
      )
    )
  )

  const getClimaticValue = (name: string, countryIso: CountryIso) => {
    const source =
      climaticData[countryIso].climaticDomain.percentOfForestArea2015 ??
      climaticData[countryIso].climaticDomain.percentOfForestArea2015Default
    return source[name].raw
  }

  return countries.flatMap(({ countryIso, regionCodes }) =>
    years.flatMap((year: string) => ({
      regions: regionCodes.join(';'),
      iso3: countryIso,
      name: countryIso,
      year,
      boreal: getClimaticValue('boreal', countryIso),
      temperate: getClimaticValue('temperate', countryIso),
      tropical: getClimaticValue('tropical', countryIso),
      subtropical: getClimaticValue('sub_tropical', countryIso),
      '5a_insect': tableData[countryIso].disturbances[year].insects?.raw ?? null,
      '5a_diseases': tableData[countryIso].disturbances[year].diseases?.raw ?? null,
      '5a_weather': tableData[countryIso].disturbances[year].severe_weather_events?.raw ?? null,
      '5a_other': tableData[countryIso].disturbances[year].other?.raw ?? null,
    }))
  )
}
