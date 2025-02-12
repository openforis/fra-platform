import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { TableName, TableNames } from 'meta/assessment'
import { RecordAssessmentData, RecordCountryData } from 'meta/data'

import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { DataRedisRepository } from 'server/repository/redis/data'

import { getTablesCondition } from './tableData/_tablesCondition'
import { PropsGetTableData } from './tableData/props'

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

export const getTableData = async (
  props: PropsGetTableData,
  client: BaseProtocol = DB
): Promise<RecordAssessmentData> => {
  const { assessment, columns, countryISOs, cycle, mergeOdp, tableNames, variables } = props

  const tables = getTablesCondition({ tableNames, columns, variables, mergeOdp })

  const tableData = await DataRedisRepository.getCountriesData({ assessment, cycle, tables, countryISOs })

  if (mergeOdp) {
    // TODO: add country cache and add AreaRedisRepository.getCountriesRecord()
    const countries = await CountryRepository.getManyRecord({ assessment, cycle }, client)

    countryISOs.forEach((countryIso) => {
      const country = countries[countryIso]
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
