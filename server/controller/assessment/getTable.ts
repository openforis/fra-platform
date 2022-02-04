import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

export const getTable = async (
  props: { countryIso: CountryIso; assessmentName: AssessmentName; cycleName: string; tableName: string },
  client: BaseProtocol = DB
): Promise<any> => {
  const { countryIso, assessmentName, cycleName, tableName } = props

  return client.tx(async (t) => {
    const assessment = await AssessmentRepository.read({ name: assessmentName }, t)
    const table = await AssessmentRepository.readTable(
      {
        assessment,
        countryIso,
        assessmentName,
        cycleName,
        tableName,
      },
      t
    )

    return table
  })
}
