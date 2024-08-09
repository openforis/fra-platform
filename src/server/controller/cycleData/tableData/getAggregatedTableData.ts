import { RegionCode } from 'meta/area'
import { RecordAssessmentData } from 'meta/data'

import { getTablesCondition } from 'server/controller/cycleData/tableData/getTablesCondition'
import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { DataRepository } from 'server/repository/assessmentCycle/data'

import { Props } from './props'

export const getAggregatedTableData = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<RecordAssessmentData> => {
  const { assessment, cycle, countryISOs: countryISOsProp, tableNames, columns, variables, mergeOdp } = props
  const tables = getTablesCondition({ tableNames, columns, variables, mergeOdp })

  const regionCode = countryISOsProp[0] as RegionCode
  const countryISOs = await CountryRepository.getCountryIsos({ assessment, cycle, regionCode }, client)

  const faoEstimates = await DataRepository.getFaoEstimateData(
    { assessment, cycle, countryISOs, regionCode, tables },
    client
  )

  return {
    [assessment.props.name]: {
      [cycle.name]: faoEstimates,
    },
  }
}
