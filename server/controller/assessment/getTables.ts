import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

// TODO: update return type from <any>
export const getTables = async (
  props: {
    countryIso: CountryIso
    assessmentName: AssessmentName
    cycleName: string
    section: string
    tableNames: Array<string>
  },
  client: BaseProtocol = DB
): Promise<any> => {
  const { countryIso, assessmentName, cycleName, section, tableNames } = props
  // TODO: Verify tableNames exist in section?
  if (!section) throw new Error('missing section')

  return client.tx(async (t) => {
    const assessment = await AssessmentRepository.read({ name: assessmentName }, t)

    const tables = await Promise.all(
      tableNames.map(async (tableName) => {
        const { data } = await AssessmentRepository.readTables(
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
