import { RegionCode } from 'meta/area'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { getTableData } from 'server/controller/cycleData/getTableData'
import { getTablesCondition } from 'server/controller/cycleData/tableData/getTablesCondition'
import { BaseProtocol, DB } from 'server/db'
import { CountryRegionRepository } from 'server/repository/assessmentCycle/countryRegion'
import { DataRepository } from 'server/repository/assessmentCycle/data'

import { Props } from './props'

export const getAggregatedTableData = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<RecordAssessmentData> => {
  const { assessment, cycle, countryISOs, tableNames, columns, variables, mergeOdp } = props
  const tables = getTablesCondition({ tableNames, columns, variables, mergeOdp })
  const regionCode = countryISOs[0] as RegionCode

  const aggregatedData = await DataRepository.getAggregatedTableData({ assessment, cycle, regionCode, tables }, client)

  const countries = await CountryRegionRepository.getManyRegionCountries({ assessment, cycle, regionCode }, client)
  const tableData = await getTableData({ ...props, countryISOs: countries }, client)

  const mergedData = RecordAssessmentDatas.mergeRecordTableData(
    RecordAssessmentDatas.sumCountryValues(tableData),
    aggregatedData[regionCode]
  )

  return {
    [assessment.props.name]: {
      [cycle.name]: {
        [regionCode]: mergedData,
      },
    },
  }
}
