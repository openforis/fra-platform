import { Assessment, Cycle, Table } from '@meta/assessment'

import { Schemas } from '@server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  table: Table
}

export const getTableDataCreateViewDDL = (props: Props): string => {
  const { assessment, cycle, table } = props

  const schema = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const query = `
  create or replace view ${schemaCycle}.${table.props.name} as
  (
  select n.country_iso,
         r.props ->> 'variableName' as variable_name,
         c.props ->> 'colName'      as col_name,
         n.value
  from ${schemaCycle}.node n
           left join ${schema}.row r
                     on r.uuid = n.row_uuid
           left join ${schema}.col c
                     on c.uuid = n.col_uuid
           left join ${schema}."table" t
                     on t.id = r.table_id
           where t.props ->> 'name' = '${table.props.name}'
             and r.props ->> 'type' in ('data', 'calculated')
           order by 1, 2, 3
    );
    
  `
  return query
}
