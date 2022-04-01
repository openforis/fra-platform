import { BaseProtocol, DB, Schemas } from '@server/db'
import { Assessment, Col, ColType } from '@meta/assessment'
import { Objects } from '@core/utils'

export const getMany = (
  props: { assessment: Assessment; tableId?: number; rowId?: number },
  client: BaseProtocol = DB
): Promise<Array<Col>> => {
  const { assessment, tableId, rowId } = props
  if ((rowId && tableId) || (!rowId && !tableId)) {
    throw new Error(`Only and only one between rowId and tableId must be present`)
  }
  const schema = Schemas.getName(assessment)
  const where = tableId
    ? `where c.row_id in (
         select r.id
         from ${schema}.row r
         where table_id = $1
     )`
    : `where c.row_id = $1`

  return client.map<Col>(
    `select *
     from assessment_fra.col c
     ${where}
       and c.props ->> 'colType' not in ('${ColType.header}', '${ColType.noticeMessage}')`,
    [tableId ?? rowId],
    // @ts-ignore
    Objects.camelize
  )
}
