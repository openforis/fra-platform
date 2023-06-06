import { Objects } from 'utils/objects'

import { Assessment, Row } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { ColAdapter } from 'server/repository/adapter/col'

type Props = {
  assessment: Assessment
  tableName: string
  variableName: string
  includeCols?: boolean
}

export const getOne = (props: Props, client: BaseProtocol = DB): Promise<Row> => {
  const { assessment, tableName, variableName, includeCols } = props
  const schema = Schemas.getName(assessment)

  return client.one<Row>(
    `
        select r.*
               ${includeCols ? `, coalesce(jsonb_agg(c.*)    filter (where c.uuid is not null), '[]')     as cols` : ''}
        from ${schema}.row r
                left join ${schema}."table" t on r.table_id = t.id
                ${includeCols ? `left join ${schema}.col c on r.id = c.row_id` : ''}
        where r.props ->> 'variableName' = $1
            and t.props ->> 'name' = $2
        ${includeCols ? `group by r.id, r.uuid, r.props` : ''}
    `,
    [variableName, tableName],
    (row) => {
      const _row = {
        ...Objects.camelize(row),
        props: {
          ...Objects.camelize(row.props),
          calculateFn: row.props.calculateFn,
          linkToSection: row.props.linkToSection,
          validateFns: row.props.validateFns,
          chart: row.props.chart,
        },
      }
      if (includeCols) {
        _row.cols = row.cols.map(ColAdapter)
      }
      return _row
    }
  )
}
