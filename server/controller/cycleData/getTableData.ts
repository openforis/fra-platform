import { BaseProtocol, DB } from '@server/db'
import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { TableData } from '@meta/data'
import { CycleDataRepository } from '@server/repository/cycleData'
import { AssessmentController } from '@server/controller'

export const getTableData = async (
  props: {
    countryIso: CountryIso
    assessmentName: AssessmentName
    cycleName: string
    section: string
    tableNames: Array<string>
  },
  client: BaseProtocol = DB
): Promise<TableData> => {
  const { countryIso, assessmentName, cycleName, section, tableNames } = props
  if (!section) throw new Error('missing section')

  const tables: Record<string, any> = {}
  tableNames.forEach((tableName) => {
    tables[tableName] = {}
  })

  return client.tx(async (t) => {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName }, t)

    return CycleDataRepository.getTableData(
      {
        assessment,
        cycle,

        tables,
        countryISOs: [countryIso],
      },
      t
    )
  })
}
