import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { TableData } from '@meta/data'

import { BaseProtocol, DB } from '@server/db'
import { DataRepository } from '@server/repository/assessmentCycle/data'

export const getTableData = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    tableNames: Array<string>
    countries: Array<CountryIso>
    variables: Array<string>
    columns: Array<string>
  },
  client: BaseProtocol = DB
): Promise<TableData> => {
  const { countryIso, tableNames, assessment, cycle, countries, variables, columns } = props

  const tables: Record<string, { columns: Array<string>; variables: Array<string> }> = {}
  tableNames.forEach((tableName) => {
    tables[tableName] = { columns, variables }
  })

  return DataRepository.getTableData(
    {
      assessment,
      cycle,
      tables,
      countryISOs: countries || [countryIso],
    },
    client
  )
}
