import { Objects } from 'utils/objects'

import { Country, CountryIso } from 'meta/area'
import { TableName, TableNames } from 'meta/assessment'
import { RecordAssessmentData, RecordCountryData } from 'meta/data'

import { getTablesCondition } from 'server/controller/cycleData/tableData/getTablesCondition'
import { Props } from 'server/controller/cycleData/tableData/props'
import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { DataRedisRepository } from 'server/repository/redis/data'

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
  const { assessment, columns, countryISOs, cycle, mergeOdp, tableNames, variables } = props

  const tables = getTablesCondition({ tableNames, columns, variables, mergeOdp })

  const tableData = await DataRedisRepository.getCountriesData({ assessment, cycle, tables, countryISOs })

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
