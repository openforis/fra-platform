import { climaticDomain } from '@server/controller/cycleData/getBulkDownload/climaticDomain'
import { getClimaticValue } from '@server/controller/cycleData/getBulkDownload/getClimaticValue'
import { getData } from '@server/controller/cycleData/getBulkDownload/getData'
import { getYears } from '@server/controller/cycleData/getBulkDownload/getYears'
import { Props } from '@server/controller/cycleData/getBulkDownload/props'

export const getContent = async (
  props: Props & { entries: { tableName: string; variables: { csvColumn: string; variableName: string }[] }[] }
) => {
  const { assessment, cycle, countries, entries } = props
  const climaticData = await climaticDomain(props)
  const tableNames = entries.map(({ tableName }) => tableName)
  const data = await getData({
    assessment,
    cycle,
    countries,
    tableNames,
  })

  const years = getYears({
    data: data[assessment.props.name][cycle.name],
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
        boreal: getClimaticValue('boreal', countryIso, climaticData[assessment.props.name][cycle.name]),
        temperate: getClimaticValue('temperate', countryIso, climaticData[assessment.props.name][cycle.name]),
        tropical: getClimaticValue('tropical', countryIso, climaticData[assessment.props.name][cycle.name]),
        subtropical: getClimaticValue('sub_tropical', countryIso, climaticData[assessment.props.name][cycle.name]),
      }

      entries.forEach(({ variables, tableName }) => {
        variables.forEach(({ variableName, csvColumn }) => {
          base[csvColumn] =
            data[assessment.props.name][cycle.name][countryIso][tableName]?.[year]?.[variableName]?.raw ?? null
        })
      })

      return base
    })
  )
}
