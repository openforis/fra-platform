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
  const { assessment, cycle, countryISOs: countryISOsProp, tableNames, columns, variables, mergeOdp } = props
  const tables = getTablesCondition({ tableNames, columns, variables, mergeOdp })

  const regionCode = countryISOsProp[0] as RegionCode
  const countryISOs = await CountryRegionRepository.getManyRegionCountries({ assessment, cycle, regionCode }, client)

  const faoEstimates = await DataRepository.getFaoEstimateData({ assessment, cycle, countryISOs, tables }, client)
  const data = await getTableData({ ...props, countryISOs }, client)
  const getDataProps = { data, cycleName: cycle.name, assessmentName: assessment.props.name }
  const tableData = RecordAssessmentDatas.getCycleData(getDataProps)

  const mergedData = RecordAssessmentDatas.mergeRecordTableData(faoEstimates, tableData)
  const countryDataSum = RecordAssessmentDatas.sumCountryValues(mergedData)

  return {
    [assessment.props.name]: {
      [cycle.name]: {
        [regionCode]: countryDataSum,
      },
    },
  }
}
