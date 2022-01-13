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

  return `
      create view ${schemaCycle}.${table.props.name} as
      select (regexp_split_to_array(t.cat, '_'))[1]::varchar(3) as country_iso,
             (regexp_split_to_array(t.cat, '_'))[2]::uuid       as row_uuid,
             ${colIndexes.map((colIdx) => `t.col_${colIdx}`).join(', ')}
      from crosstab(
              $$
          select
              (n.country_iso || '_' || n.row_uuid)::varchar as cat,
              n.col_uuid,
              n.value as value
          from
              ${schemaCycle}.node n
          where
              n.row_uuid in (${rowsData.map((r) => `'${r.uuid}'`).join(',')})
          order by 1,2
          $$
         ) as t (cat varchar, ${colIndexes.map((colIdx) => `col_${colIdx} jsonb`).join(', ')})
  `
}
