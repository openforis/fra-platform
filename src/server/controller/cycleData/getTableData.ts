import { RecordAssessmentData } from 'meta/data'

import { BaseProtocol, DB } from 'server/db'
import { DataRedisRepository } from 'server/repository/redis/data'

import { mergeOdpCountryData } from './tableData/_mergeOdpCountryData'
import { getTablesCondition } from './tableData/_tablesCondition'
import { PropsGetTableData } from './tableData/props'

export const getTableData = async (
  props: PropsGetTableData,
  client: BaseProtocol = DB
): Promise<RecordAssessmentData> => {
  const { assessment, columns, countryISOs, cycle, mergeOdp, tableNames, variables } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const tables = getTablesCondition({ tableNames, columns, variables, mergeOdp })
  const data = await DataRedisRepository.getCountriesData({ assessment, cycle, tables, countryISOs })

  if (mergeOdp) {
    await mergeOdpCountryData({ assessment, cycle, countryISOs, data, tables }, client)
  }

  return { [assessmentName]: { [cycleName]: data } }
}
