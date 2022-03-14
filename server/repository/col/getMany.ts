import { BaseProtocol, DB, Schemas } from '@server/db'
import { Assessment, Col, ColType } from '@meta/assessment'
import { Objects } from '@core/utils'

export const getMany = (
  props: { assessment: Assessment; tableId: number },
  client: BaseProtocol = DB
): Promise<Array<Col>> => {
  const { assessment, tableId } = props
  const schema = Schemas.getName(assessment)

  return client.map<Col>(
    `select *
     from assessment_fra.col c
     where c.row_id in (
         select r.id
         from ${schema}.row r
         where table_id = $1
     )
       and c.props ->> 'colType' not in ('${ColType.header}', '${ColType.noticeMessage}')`,
    [tableId],
    // @ts-ignore
    Objects.camelize
  )
}
