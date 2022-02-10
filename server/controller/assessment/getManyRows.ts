import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { AssessmentName, Row } from '@meta/assessment'

export const getManyRows = async (
  props: { tableId: number; assessmentName: AssessmentName },
  client: BaseProtocol = DB
): Promise<Array<Row>> => {
  const { tableId, assessmentName } = props

  return client.tx(async (t) => {
    const assessment = await AssessmentRepository.read({ name: assessmentName }, t)
    const rows = await AssessmentRepository.getManyRows({ assessment, tableId }, t)
    return Promise.all(
      rows.map(async (row: Row) => {
        return {
          ...row,
          cols: await AssessmentRepository.getManyCols({ assessment, rowId: row.id }),
        }
      })
    )
  })
}
