import { BaseProtocol, DB } from '@server/db'
import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { TableData } from '@meta/data'
import { CycleDataRepository } from '@server/repository/cycleData'
import { TableSectionRepository } from '@server/repository/tableSection'

export const getTableData = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    sectionName: string
  },
  client: BaseProtocol = DB
): Promise<TableData> => {
  const { countryIso, assessment, cycle, sectionName } = props

  const tableNames = await TableSectionRepository.getTableNames({ sectionName, assessment })

  const tables: Record<string, any> = {}
  tableNames.forEach((tableName) => {
    tables[tableName] = {}
  })

  return CycleDataRepository.getTableData(
    {
      assessment,
      cycle,
      tables,
      countryISOs: [countryIso],
    },
    client
  )
}
