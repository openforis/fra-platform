import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { getTableData } from 'server/controller/cycleData/getTableData'
import { getTablesCondition } from 'server/controller/cycleData/tableData/getTablesCondition'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { DataRepository } from 'server/repository/assessmentCycle/data'

import { Props } from './props'

export const getAggregatedTableData = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<RecordAssessmentData> => {
  const { assessment, cycle, countryISOs, tableNames, columns, variables, mergeOdp } = props
  const tables = getTablesCondition({ tableNames, columns, variables, mergeOdp })

  const aggregatedData = await DataRepository.getAggregatedTableData({ assessment, cycle, countryISOs, tables }, client)

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // AreaRepository.getManyByRegion
  const regionCode = countryISOs[0]
  const countries = await client.map(
    `
      select country_iso
      from ${schemaCycle}.country_region
      where region_code = $1 and country_iso not ilike 'X%'
  `,
    [regionCode],
    (row) => row.country_iso
  )

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
