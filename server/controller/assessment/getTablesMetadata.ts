import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { AssessmentName, Table } from '@meta/assessment'

export const getTablesMetadata = async (
  props: { assessmentName: AssessmentName; section: string },
  client: BaseProtocol = DB
): Promise<Array<Table>> => {
  const { assessmentName, section } = props

  return client.tx(async (t) => {
    const assessment = await AssessmentRepository.read({ name: assessmentName }, t)
    const table = await AssessmentRepository.readTablesMetadata(
      {
        assessment,
        section,
      },
      t
    )

    return table
  })
}
