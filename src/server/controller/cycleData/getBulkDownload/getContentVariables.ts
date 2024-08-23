import { TableNames } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { climaticDomain } from 'server/controller/cycleData/getBulkDownload/climaticDomain'
import { getClimaticValue } from 'server/controller/cycleData/getBulkDownload/getClimaticValue'
import { getData } from 'server/controller/cycleData/getBulkDownload/getData'
import { Props } from 'server/controller/cycleData/getBulkDownload/props'
import { TableRepository } from 'server/repository/assessment/table'

type Entries = Array<{ tableName: string; variables: Array<{ csvColumn: string; variableName: string }> }>

export const getContentVariables = async (props: Props & { fileName: string; entries: Entries }) => {
  const { assessment, cycle, countries, entries, fileName } = props
  const _climaticData = await climaticDomain(props)
  const climaticData = RecordAssessmentDatas.getCycleData({
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    data: _climaticData,
  })
  const tableNames = entries.map(({ tableName }) => tableName).concat(TableNames.extentOfForest)
  const tablesMetadata = await TableRepository.getMany({ assessment, cycle, tableNames })

  const data = await getData({
    assessment,
    cycle,
    countries,
    tableNames,
  })

  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const ret: Array<{ fileName: string; content: Array<Record<string, string>> }> = []

  entries.forEach((entry) => {
    const { tableName, variables } = entry
    const tableMetadata = tablesMetadata.find((table) => table.props.name === tableName)
    const cols = tableMetadata?.props.columnNames[cycle.uuid]

    variables.forEach((variable) => {
      const { csvColumn, variableName } = variable

      const content = countries.map((country) => {
        const { countryIso, regionCodes } = country

        const forestAreaProps = {
          assessmentName,
          cycleName,
          data,
          countryIso,
          tableName: TableNames.extentOfForest,
          variableName: 'forestArea',
          colName: cycleName,
        }
        const forestArea = RecordAssessmentDatas.getDatum(forestAreaProps)

        let base: Record<string, string> = {
          regions: regionCodes.join(';'),
          iso3: countryIso,
          name: countryIso,
          [`forest area ${cycleName}`]: forestArea,
          boreal: getClimaticValue('boreal', countryIso, climaticData),
          temperate: getClimaticValue('temperate', countryIso, climaticData),
          tropical: getClimaticValue('tropical', countryIso, climaticData),
          subtropical: getClimaticValue('sub_tropical', countryIso, climaticData),
        }

        cols.forEach((colName) => {
          const datum =
            RecordAssessmentDatas.getDatum({
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              data,
              countryIso,
              tableName,
              variableName,
              colName,
            }) ?? null

          base = { ...base, [colName]: datum }
        })

        return base
      })

      ret.push({ fileName: `${fileName}_variables/${csvColumn}`, content })
    })
  })

  return ret
}
