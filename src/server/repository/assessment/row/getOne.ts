import { Objects } from '@utils/objects'

import { Assessment, Col, Row } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

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
               ${includeCols ? `, jsonb_agg(c.*)        as cols` : ''}
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
          validateFns: row.props.validateFns,
        },
      }
      if (includeCols) {
        _row.cols = row.cols.map((col: Col) => {
          return {
            ...Objects.camelize(col),
            props: {
              ...Objects.camelize(col.props),
              calculateFn: col.props.calculateFn,
            },
          }
        })
      }
      return _row
    }
  )
}
