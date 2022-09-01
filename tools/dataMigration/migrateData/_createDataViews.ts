import { Assessment } from '../../../src/meta/assessment/assessment'
import { Cycle } from '../../../src/meta/assessment/cycle'
import { Table } from '../../../src/meta/assessment/table'
import { DBNames } from '../_DBNames'

export const getCreateViewDDL = async (props: {
  assessment: Assessment
  cycle: Cycle
  table: Table
}): Promise<string> => {
  const { assessment, cycle, table } = props

  const schema = DBNames.getAssessmentSchema(assessment.props.name)
  const schemaCycle = DBNames.getCycleSchema(assessment.props.name, cycle.name)

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
