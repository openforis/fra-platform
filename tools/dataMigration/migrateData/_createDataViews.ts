import { ITask } from 'pg-promise'
import { Assessment, RowType, Table } from '../../../meta/assessment'
import { DBNames } from '../_DBNames'
import { getColIndexes, getCols, getRows } from './_repos'

export const getCreateViewDDL = async (
  props: {
    assessment: Assessment
    table: Table
  },
  client: ITask<any>
): Promise<string> => {
  const { assessment, table } = props

  const schema = DBNames.getAssessmentSchema(assessment.props.name)
  const rows = await getRows(client, schema, table)
  const cols = await getCols(client, schema, table)
  const rowsData = rows.filter((row) => row.props.type === RowType.data)
  const colIndexes = getColIndexes(rowsData, cols)
  const schemaCycle = DBNames.getCycleSchema(assessment.props.name, assessment.cycles[0].name)

  const categorySeparator = '@@@@@@@@@@'
  const getColName = (colIdx: number): string => {
    const col = cols.find((c) => c.props.index === colIdx)
    if (!col) {
      throw new Error(`Column not found. Table ${table.props.name}. Col idx ${colIdx}`)
    }
    // return `_${col?.props?.colName ?? ''}_${colIdx}`
    return `"${col.props.colName ?? ''}"`
  }

  return `
      create view ${schemaCycle}.${table.props.name} as
      select (regexp_split_to_array(t.cat, '${categorySeparator}'))[1]::varchar(3) as country_iso,
             (regexp_split_to_array(t.cat, '${categorySeparator}'))[2]::varchar    as variable_name,
             ${colIndexes.map((colIdx) => `t.${getColName(colIdx)}`).join(', ')}
      from crosstab(
              $$
          select
              (n.country_iso || '${categorySeparator}' || (r.props->>'variableName'))::varchar as cat,
              n.col_uuid,
              n.value as value
          from
              ${schemaCycle}.node n
          left join ${schema}.row r
              on r.uuid = n.row_uuid               
          where
              n.row_uuid in (${rowsData.map((r) => `'${r.uuid}'`).join(',')})
          order by 1,2
          $$
         ) as t (cat varchar, ${colIndexes.map((colIdx) => `${getColName(colIdx)} jsonb`).join(', ')})
  `
}
