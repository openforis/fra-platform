import { Assessment, Row } from '@meta/assessment'
import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'

export const getOne = (
  props: { assessment: Assessment; tableName: string; variableName: string },
  client: BaseProtocol = DB
): Promise<Row> => {
  const { assessment, tableName, variableName } = props
  const schema = Schemas.getName(assessment)

  return client.one<Row>(
    `
        select r.*
        from ${schema}.row r
                 left join ${schema}."table" t
                           on r.table_id = t.id
        where r.props ->> 'variableName' = $1
          and t.props ->> 'name' = $2
    `,
    [variableName, tableName],
    Objects.camelize
  )
}
