import { climaticDomain } from '@server/controller/cycleData/getBulkDownload/climaticDomain'
import { entries } from '@server/controller/cycleData/getBulkDownload/entries/AnnualData'
import { getClimaticValue } from '@server/controller/cycleData/getBulkDownload/getClimaticValue'
import { getData } from '@server/controller/cycleData/getBulkDownload/getData'
import { getYears } from '@server/controller/cycleData/getBulkDownload/getYears'
import { Props } from '@server/controller/cycleData/getBulkDownload/props'

export const getAnnualData = async (props: Props) => {
  const { assessment, cycle, countries } = props
  const climaticData = await climaticDomain(props)
  const tableNames = entries.map((e) => e.tableName)
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
