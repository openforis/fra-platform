import { entries } from '@server/controller/cycleData/getBulkDownload/entries/FRAYears'
import { genders } from '@server/controller/cycleData/getBulkDownload/genders'
import { getClimaticValue } from '@server/controller/cycleData/getBulkDownload/getClimaticValue'
import { getData } from '@server/controller/cycleData/getBulkDownload/getData'
import { getYears } from '@server/controller/cycleData/getBulkDownload/getYears'

import { climaticDomain } from './climaticDomain'
import { Props } from './props'

export const getFraYearsData = async (props: Props) => {
  const { assessment, cycle, countries } = props
  const climaticData = await climaticDomain(props)
  const tableNames = entries.map(({ tableName }) => tableName)
  const data = await getData({
    assessment,
    cycle,
    countries,
    tableNames,
  })

  // Unique years
  const years = getYears({
    data,
    countries,
    tableNames,
  }).filter((x) => Number.isInteger(+x))

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
          if (tableName === 'carbonstocksoildepth')
            base[csvColumn] = data[countryIso][tableName]?.[variableName]?.[variableName]?.raw ?? null
          else if (tableName === 'graduationofstudents' || tableName === 'employment') {
            genders.forEach((gender) => {
              base[`${csvColumn}_${gender.csv}`] =
                data[countryIso][tableName]?.[`${year}_${gender.variable}`]?.[variableName]?.raw ?? null
            })
          } else base[csvColumn] = data[countryIso][tableName]?.[year]?.[variableName]?.raw ?? null
        })
      })

      return base
    })
  )
}
