import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { TableData } from '@meta/data'

export const getTableData = async (
  props: {
    countryIso: CountryIso
    assessmentName: AssessmentName
    cycleName: string
    section: string
    tableNames: Array<string>
  },
  client: BaseProtocol = DB
): Promise<Array<{ tableName: string; data: TableData }>> => {
  const { countryIso, assessmentName, cycleName, section, tableNames } = props
  if (!section) throw new Error('missing section')

  return client.tx(async (t) => {
    const assessment = await AssessmentRepository.read({ name: assessmentName }, t)

    const tables = await Promise.all(
      tableNames.map(async (tableName) => {
        const { data } = await AssessmentRepository.readTableData(
          {
            assessment,
            countryIso,
            cycleName,
            tableName,
          },
          t
        )

        return {
          tableName,
          data,
        }
      })
    )

    return tables
  })
}
