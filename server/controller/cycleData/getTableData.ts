import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { TableData } from '@meta/data'

import { BaseProtocol, DB } from '@server/db'
import { DataRepository } from '@server/repository/assessmentCycle/data'

export const getTableData = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    tableNames: Array<string>
    countryISOs: Array<CountryIso>
    variables: Array<string>
    columns: Array<string>
  },
  client: BaseProtocol = DB
): Promise<TableData> => {
  const { tableNames, assessment, cycle, countryISOs, variables, columns } = props

  const tables: Record<string, { columns: Array<string>; variables: Array<string> }> = {}
  tableNames.forEach((tableName) => {
    tables[tableName] = { columns, variables }
  })

  return DataRepository.getTableData(
    {
      assessment,
      cycle,
      tables,
      countryISOs,
    },
    client
  )
}
