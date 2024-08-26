import { RecordAssessmentDatas } from 'meta/data'

import { climaticDomain } from 'server/controller/cycleData/getBulkDownload/climaticDomain'
import { getClimaticValue } from 'server/controller/cycleData/getBulkDownload/getClimaticValue'
import { getData } from 'server/controller/cycleData/getBulkDownload/getData'
import { Props } from 'server/controller/cycleData/getBulkDownload/props'
import { TableRepository } from 'server/repository/assessment/table'

export const getContent = async (
  props: Props & { entries: { tableName: string; variables: { csvColumn: string; variableName: string }[] }[] }
) => {
  const { assessment, cycle, countries, entries } = props
  const _climaticData = await climaticDomain(props)
  const climaticData = RecordAssessmentDatas.getCycleData({
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    data: _climaticData,
  })
  const tableNames = entries.map(({ tableName }) => tableName)
  const tablesMetadata = await TableRepository.getMany({ assessment, cycle, tableNames })

  const data = await getData({
    assessment,
    cycle,
    countries,
    tableNames,
  })

  return countries.flatMap(({ countryIso, regionCodes }) => {
    return entries.flatMap((entry) => {
      const { tableName, variables } = entry
      const tableMetadata = tablesMetadata.find((table) => table.props.name === tableName)
      const cols = tableMetadata?.props.columnNames[cycle.uuid]

      return cols.flatMap<Record<string, string>>((colName: string) => {
        const base: Record<string, string> = {
          regions: regionCodes.join(';'),
          iso3: countryIso,
          name: countryIso,
          year: colName,
          boreal: getClimaticValue('boreal', countryIso, climaticData),
          temperate: getClimaticValue('temperate', countryIso, climaticData),
          tropical: getClimaticValue('tropical', countryIso, climaticData),
          subtropical: getClimaticValue('sub_tropical', countryIso, climaticData),
        }

        variables.forEach(({ variableName, csvColumn }) => {
          base[csvColumn] =
            RecordAssessmentDatas.getDatum({
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              data,
              countryIso,
              tableName,
              variableName,
              colName,
            }) ?? null
        })

        return base
      })
    })
  })
}
