import { Objects } from '@utils/objects'

import { Assessment, Col, ColType } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

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
         where r.table_id = $1
     )`
    : `where c.row_id = $1`

  return client.map<Col>(
    `select *
     from ${schema}.col c
     ${where}
       and c.props ->> 'colType' not in ('${ColType.header}', '${ColType.noticeMessage}')`,
    [tableId ?? rowId],
    (col) => {
      return {
        ...Objects.camelize(col),
        props: {
          ...Objects.camelize(col.props),
          calculateFn: col.props.calculateFn,
          validateFns: col.props.validateFns,
        },
      }
    }
  )
}
