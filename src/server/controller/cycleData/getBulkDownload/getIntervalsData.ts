import { entries } from '@server/controller/cycleData/getBulkDownload/entries/Intervals'
import { getData } from '@server/controller/cycleData/getBulkDownload/getData'
import { getYears } from '@server/controller/cycleData/getBulkDownload/getYears'

import { climaticDomain } from './climaticDomain'
import { getClimaticValue } from './getClimaticValue'
import { Props } from './props'

export const getIntervalsData = async (props: Props) => {
  const { assessment, cycle, countries } = props
  const climaticData = await climaticDomain(props)
  const tableNames = entries.map(({ tableName }) => tableName)
  const data = await getData({
    assessment,
    cycle,
    countries,
    tableNames,
  })

  const years = getYears({
    data,
    countries,
    tableNames,
  })

  return countries.flatMap(({ countryIso, regionCodes }) =>
    years.flatMap<Record<string, string>>((year: string) => {
      const base: Record<string, string> = {
        regions: regionCodes.join(';'),
        iso3: countryIso,
        name: countryIso,
        year,
        boreal: getClimaticValue('boreal', countryIso, climaticData),
        temperate: getClimaticValue('temperate', countryIso, climaticData),
        tropical: getClimaticValue('tropical', countryIso, climaticData),
        subtropical: getClimaticValue('sub_tropical', countryIso, climaticData),
      }

      entries.forEach(({ variables, tableName }) => {
        variables.forEach(({ variableName, csvColumn }) => {
          base[csvColumn] = data[countryIso][tableName]?.[year]?.[variableName]?.raw ?? null
        })
      })

      return base
    })
  )
}
