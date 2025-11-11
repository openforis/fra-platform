import { Assessment } from 'meta/assessment/assessment'
import { Col, ColType } from 'meta/assessment/col'
import { UUID } from 'meta/uuid'

import { BaseProtocol, DB } from 'server/db/db'
import { ColAdapter } from 'server/db/repository/adapter/col'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  tableUuid?: UUID
  rowId?: number
}

export const getMany = (props: Props, client: BaseProtocol = DB): Promise<Array<Col>> => {
  const { assessment, rowId, tableUuid } = props
  if ((rowId && tableUuid) || (!rowId && !tableUuid)) {
    throw new Error(`Either rowId or tableUuid must be present`)
  }
  const schema = Schemas.getName(assessment)
  const where = tableUuid
    ? `where c.row_id in (
         select r.id
         from ${schema}.row r
         where r.table_uuid = $1
     )`
    : `where c.row_id = $1`

  return client.map<Col>(
    `select *
     from ${schema}.col c
     ${where}
       and c.props ->> 'colType' not in ('${ColType.header}', '${ColType.noticeMessage}')`,
    [tableUuid ?? rowId],
    ColAdapter
  )
}
