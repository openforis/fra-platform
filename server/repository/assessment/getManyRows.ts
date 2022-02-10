import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Assessment, Row } from '@meta/assessment'

export const getManyRows = async (
  props: {
    assessment: Assessment
    tableId: number
  },
  client: BaseProtocol = DB
): Promise<Array<Row>> => {
  const { tableId, assessment } = props
  const schemaName = Schemas.getName(assessment)
  return client.map<Row>(
    `
          select * from ${schemaName}.row where table_id = $1
      `,
    [tableId],
    // @ts-ignore
    Objects.camelize
  )
}
