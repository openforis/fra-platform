import { RecordAssessmentDatas } from 'meta/data'

import { climaticDomain } from 'server/controller/cycleData/getBulkDownload/climaticDomain'
import { getClimaticValue } from 'server/controller/cycleData/getBulkDownload/getClimaticValue'
import { getData } from 'server/controller/cycleData/getBulkDownload/getData'
import { Props } from 'server/controller/cycleData/getBulkDownload/props'

export const getContent = async (
  props: Props & {
    entries: { tableName: string; variables: { csvColumn: string; variableName: string }[] }[]
    intervals?: boolean
  }
) => {
  const { assessment, cycle, countries, entries, intervals } = props
  const _climaticData = await climaticDomain(props)
  const climaticData = RecordAssessmentDatas.getCycleData({
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    data: _climaticData,
  })
  const tableNames = entries.map(({ tableName }) => tableName)

  const data = await getData({
    assessment,
    cycle,
    countries,
    tableNames,
  })

  const years = intervals
    ? ['1990-2000', '2000-2010', '2010-2015', '2015-2020']
    : Array.from({ length: 18 }, (_, i) => String(2000 + i))

  if (cycle.name === '2025') {
    years.push(...(intervals ? ['2020-2025'] : Array.from({ length: 7 }, (_, i) => String(2017 + i))))
  }

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
          base[csvColumn] =
            RecordAssessmentDatas.getDatum({
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              data,
              countryIso,
              tableName,
              variableName,
              colName: year,
            }) ?? null
        })
      })

      return base
    })
  )
}
