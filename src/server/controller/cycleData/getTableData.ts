import { Objects } from 'utils/objects'

import { Country, CountryIso } from 'meta/area'
import { Assessment, Cycle, TableName, TableNames, VariableCache } from 'meta/assessment'
import { RecordAssessmentData, RecordCountryData, TablesCondition } from 'meta/data'

import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { DataRepository } from 'server/repository/assessmentCycle/data'
import { DataRedisRepository } from 'server/repository/redis/data'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryISOs: Array<CountryIso>
  tableNames: Array<string> // TODO: refactor use TablesCondition instead
  variables?: Array<string>
  columns?: Array<string>
  mergeOdp: boolean
  aggregate?: boolean
  /**
   * @deprecated
   * Merge dependencies to tables condition
   * TODO: Handle dependencies differently (currently only used in calculateNode -> part of updateDependencies job)
   */
  dependencies?: Array<VariableCache>
}

const _getTablesCondition = (
  props: Pick<Props, 'tableNames' | 'columns' | 'variables' | 'mergeOdp'>
): TablesCondition => {
  const { tableNames, columns, variables, mergeOdp } = props

  const tables: TablesCondition = {}

  tableNames.forEach((tableName) => {
    tables[tableName] = { columns, variables }
  })
  const withOdp =
    mergeOdp &&
    (tableNames.includes(TableNames.extentOfForest) || tableNames.includes(TableNames.forestCharacteristics))
  if (withOdp) {
    tables[TableNames.originalDataPointValue] = { columns, variables }
  }

  return tables
}

const _mergeODPTable = (props: {
  countryIso: CountryIso
  tableData: RecordCountryData
  tableName: TableName
}): void => {
  const { countryIso, tableData, tableName } = props

  const odpData = tableData?.[countryIso]?.[TableNames.originalDataPointValue]
  if (odpData) {
    const dataMerged = { ...tableData[countryIso][tableName], ...odpData }
    Objects.setInPath({ obj: tableData, path: [countryIso, tableName], value: dataMerged })
  }
}

export const getTableData = async (props: Props, client: BaseProtocol = DB): Promise<RecordAssessmentData> => {
  const { tableNames, aggregate, assessment, cycle, countryISOs, variables, columns, mergeOdp } = props

  const tables = _getTablesCondition({ tableNames, columns, variables, mergeOdp })

  // TODO: Cache aggregated Table data
  if (aggregate) {
    return {
      [assessment.props.name]: {
        [cycle.name]: await DataRepository.getAggregatedTableData(
          { assessment, cycle, countryISOs, variables, columns },
          client
        ),
      },
    }
  }

  const tableData = await DataRedisRepository.getTableData({ assessment, cycle, tables, countryISOs })

  if (mergeOdp) {
    // TODO: add country cache and add AreaRedisRepository.getCountriesMap()
    const countries = await CountryRepository.getMany({ assessment, cycle }, client)
    const countryMap = countries.reduce<Record<CountryIso, Country>>(
      (acc, country) => ({ ...acc, [country.countryIso]: country }),
      {} as Record<CountryIso, Country>
    )

    countryISOs.forEach((countryIso) => {
      const country = countryMap[countryIso]
      if (tables[TableNames.extentOfForest]) {
        _mergeODPTable({ countryIso, tableData, tableName: TableNames.extentOfForest })
      }
      if (tables[TableNames.forestCharacteristics] && country.props.forestCharacteristics.useOriginalDataPoint) {
        _mergeODPTable({ countryIso, tableData, tableName: TableNames.forestCharacteristics })
      }
    })
  }

  return {
    [assessment.props.name]: {
      [cycle.name]: tableData,
    },
  }
}
