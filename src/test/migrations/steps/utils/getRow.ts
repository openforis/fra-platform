import { Objects } from 'utils/objects'

import { Assessment, Cycle, Row } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'
import { ColAdapter } from 'server/repository/adapter'

export const getRow = async (
  props: {
    tableName: string
    variableName: string
    cycle: Cycle
    assessment: Assessment
  },
  client: BaseProtocol
) => {
  const { tableName, variableName, cycle, assessment } = props
  const schema = Schemas.getName(assessment)

  return client.one<Row>(
    `
        select r.*,
               t.props ->> 'name'                                                  as table_name,
               jsonb_agg(c.*) filter (where c.props -> 'cycles' ? '${cycle.uuid}') as cols
        from ${schema}.row r
                 left join ${schema}."table" t on r.table_id = t.id
                 left join ${schema}.col c on r.id = c.row_id
        where t.props -> 'cycles' ? '${cycle.uuid}'
          and t.props ->> 'name' = '${tableName}'
          and r.props -> 'cycles' ? '${cycle.uuid}'
          and r.props ->> 'variableName' = '${variableName}'
          and c.props -> 'cycles' ? '${cycle.uuid}'
          and (
                (r.props ->> 'calculateFn' is not null and r.props -> 'calculateFn' ->> '${cycle.uuid}' is not null)
                or
                (c.props ->> 'calculateFn' is not null and c.props -> 'calculateFn' ->> '${cycle.uuid}' is not null)
            )
        group by r.id, r.uuid, r.props, t.props ->> 'name'
        order by r.id`,
    [],
    (row) => {
      return {
        ...Objects.camelize(row),
        cols: row.cols.map(ColAdapter),
        props: {
          ...Objects.camelize(row.props),
          calculateFn: row.props.calculateFn,
          linkToSection: row.props.linkToSection,
          validateFns: row.props.validateFns,
          chart: row.props.chart,
        },
      }
    }
  )
}
