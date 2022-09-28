import { Objects } from '@utils/objects'

import { Country, CountryIso } from '@meta/area'
import { Assessment, Cycle, TableNames, VariableCache } from '@meta/assessment'
import { TableData } from '@meta/data'

import { BaseProtocol, DB } from '@server/db'
import { CountryRepository } from '@server/repository/assessmentCycle/country'
import { DataRepository } from '@server/repository/assessmentCycle/data'

export const getTableData = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    tableNames: Array<string> // TODO: refactor use TablesCondition instead
    countryISOs: Array<CountryIso>
    variables: Array<string>
    columns: Array<string>
    mergeOdp: boolean
    aggregate: boolean
    /**
     * Merge dependencies to tables condition
     */
    dependencies?: Array<VariableCache>
  },
  client: BaseProtocol = DB
): Promise<TableData> => {
  const { tableNames, aggregate, assessment, cycle, countryISOs, variables, columns, mergeOdp, dependencies } = props

  const tables: Record<string, { columns: Array<string>; variables: Array<string> }> = {}
  tableNames.forEach((tableName) => {
    tables[tableName] = { columns, variables }
  })

  if (aggregate)
    return DataRepository.getAggregatedTableData({ assessment, cycle, countryISOs, variables, columns }, client)

  const tableData = await DataRepository.getTableData({ assessment, cycle, tables, countryISOs, dependencies }, client)

  const allTableNames = [...tableNames, ...(dependencies ? dependencies.map((d) => d.tableName) : [])]
  if (
    mergeOdp &&
    (allTableNames.map((tableName) => tableName.toLowerCase()).includes(TableNames.extentOfForest.toLowerCase()) ||
      allTableNames
        .map((tableName) => tableName.toLowerCase())
        .includes(TableNames.forestCharacteristics.toLowerCase()))
  ) {
    const originalDataPointData = await DataRepository.getOriginalDataPointData({ assessment, cycle, countryISOs })
    const countries = await CountryRepository.getMany({ assessment, cycle }, client)
    const countryMap = countries.reduce<Record<CountryIso, Country>>(
      (acc, country) => ({ ...acc, [country.countryIso]: country }),
      {} as Record<CountryIso, Country>
    )
    countryISOs.forEach((countryIso) => {
      const country = countryMap[countryIso]
      allTableNames.forEach((tableName) => {
        if (
          tableName.toLowerCase() === TableNames.extentOfForest.toLowerCase() ||
          (tableName.toLowerCase() === TableNames.forestCharacteristics.toLowerCase() &&
            country.props.forestCharacteristics.useOriginalDataPoint)
        ) {
          if (tableData[countryIso] && tableData[countryIso][tableName] && originalDataPointData?.[countryIso]) {
            let { originalDataPointValue } = originalDataPointData[countryIso]
            if (columns && columns.length > 0) originalDataPointValue = Objects.pick(originalDataPointValue, columns)
            if (variables && variables.length > 0)
              originalDataPointValue = Object.entries(originalDataPointValue).reduce((acc, [year, value]) => {
                return { ...acc, [year]: Objects.pick(value, variables) }
              }, {})

            tableData[countryIso][tableName] = {
              ...tableData[countryIso][tableName],
              ...originalDataPointValue,
            }
          }
        }
      })
    })
  }

  return tableData
}
