import { Years } from 'meta/assessment/years'
import { RecordAssessmentDatas } from 'meta/data'

import { climaticDomain } from 'server/controller/cycleData/getBulkDownload/climaticDomain'
import { formatDatum } from 'server/controller/cycleData/getBulkDownload/formatDatum'
import { getClimaticValue } from 'server/controller/cycleData/getBulkDownload/getClimaticValue'
import { getData } from 'server/controller/cycleData/getBulkDownload/getData'
import { Props } from 'server/controller/cycleData/getBulkDownload/props'

export const getContent = async (
  props: Props & {
    entries: Array<{ tableName: string; variables: Array<{ csvColumn: string; variableName: string }> }>
    intervals?: boolean
  }
): Promise<Array<Record<string, string>>> => {
  const { assessment, countries, cycle, entries, intervals } = props
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

  const years = intervals ? Years.intervals(cycle) : Years.annual(cycle)

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

      entries.forEach(({ tableName, variables }) => {
        variables.forEach(({ csvColumn, variableName }) => {
          const datum = RecordAssessmentDatas.getDatum({
            assessmentName: assessment.props.name,
            cycleName: cycle.name,
            data,
            countryIso,
            tableName,
            variableName,
            colName: year,
          })

          base[csvColumn] = formatDatum(datum)
        })
      })

      return base
    })
  )
}
