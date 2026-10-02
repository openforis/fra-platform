import { RecordAssessmentData } from 'meta/data/recordData'

import { DataRedisRepository } from 'server/cache/repository/data'
import { mergeOdpCountryData } from 'server/controller/cycleData/tableData/_mergeOdpCountryData'
import { getTablesCondition } from 'server/controller/cycleData/tableData/_tablesCondition'
import { PropsGetTableData } from 'server/controller/cycleData/tableData/props'
import { BaseProtocol, DB } from 'server/db/db'

export const getData = async (props: PropsGetTableData, client: BaseProtocol = DB): Promise<RecordAssessmentData> => {
  const { assessment, columns, countryISOs, cycle, excludeOdpTable, mergeOdp, tableNames, variables } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const tables = getTablesCondition({ tableNames, columns, variables, mergeOdp })
  const data = await DataRedisRepository.getCountriesData({ assessment, cycle, tables, countryISOs }, client)

  if (mergeOdp) {
    await mergeOdpCountryData({ assessment, cycle, countryISOs, data, excludeOdpTable, tables }, client)
  }

  return { [assessmentName]: { [cycleName]: data } }
}
