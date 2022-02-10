import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Assessment, Col } from '@meta/assessment'

export const getManyCols = async (
  props: {
    assessment: Assessment
    rowId: number
  },
  client: BaseProtocol = DB
): Promise<Array<Col>> => {
  const { rowId, assessment } = props
  const schemaName = Schemas.getName(assessment)
  return client.map<Col>(
    `
          select * from ${schemaName}.col where row_id = $1
      `,
    [rowId],
    // @ts-ignore
    Objects.camelize
  )
}
