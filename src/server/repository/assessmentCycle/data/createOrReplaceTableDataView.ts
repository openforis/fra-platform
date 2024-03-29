import { Assessment, Cycle, Table } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  table: Table
}

// create or replace Table
export const createOrReplaceTableDataView = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, table } = props

  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const tableName = table.props.name

  return client.query(
    `
      create or replace view ${schemaCycle}.${tableName} as
      (
      select n.country_iso,
             r.props ->> 'variableName' as variable_name,
             c.props ->> 'colName'      as col_name,
             n.value
      from ${schemaCycle}.node n
               left join ${schemaAssessment}.row r on r.uuid = n.row_uuid
               left join ${schemaAssessment}.col c on c.uuid = n.col_uuid
               left join ${schemaAssessment}."table" t on t.id = r.table_id
      where t.props ->> 'name' = '${tableName}'
            and r.props ->> 'type' in ('data', 'calculated')
      order by 1, 2, 3
      )`
  )
}
