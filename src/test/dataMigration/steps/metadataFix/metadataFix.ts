import { Assessment } from '@meta/assessment'

import { BaseProtocol, Schemas } from '@server/db'

type Props = {
  assessment: Assessment
}

export const metadataFix = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props

  const schema = Schemas.getName(assessment)

  // fix growingStock tables col header colSpan
  await Promise.all(
    assessment.cycles.map((cycle) =>
      client.query(`
          update ${schema}.col
          set props = jsonb_set(
                  props,
                  '{style,${cycle.uuid},colSpan}',
                  to_jsonb(d.col_span)
              )
          from (select c.id                                                            as column_id,
                       jsonb_array_length(t.props -> 'columnNames' -> '${cycle.uuid}') as col_span
                from ${schema}.col c
                         left join ${schema}.row r on r.id = c.row_id
                         left join ${schema}."table" t on t.id = r.table_id
                where t.props ->> 'name' in ('growingStockAvg', 'growingStockTotal')
                  and c.props ->> 'colType' = 'header'
                  and c.props ->> 'index' = '1'
                  and c.props -> 'style' -> '${cycle.uuid}' ->> 'colSpan' is null) as d
          where id = d.column_id
      `)
    )
  )
}
