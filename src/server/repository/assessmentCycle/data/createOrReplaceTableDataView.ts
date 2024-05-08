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
      with country_nodes as (select n.country_iso,
                                    r.props ->> 'variableName' as variable_name,
                                    c.props ->> 'colName'      as col_name,
                                    n.value,
                                    1                          as priority
                             from ${schemaCycle}.node n
                                      left join ${schemaAssessment}.row r on r.uuid = n.row_uuid
                                      left join ${schemaAssessment}.col c on c.uuid = n.col_uuid
                                      left join ${schemaAssessment}."table" t on t.id = r.table_id
                             where t.props ->> 'name' = '${tableName}'
                               and r.props ->> 'type' in ('data', 'calculated')),
           country_node_exts as (select n.country_iso,
                                        r.props ->> 'variableName' as variable_name,
                                        c.props ->> 'colName'      as col_name,
                                        n.value,
                                        2                          as priority
                                 from ${schemaCycle}.node_ext n
                                          left join ${schemaAssessment}.row r
                                                    on r.props ->> 'variableName' = n.props ->> 'variableName'
                                          left join ${schemaAssessment}.col c
                                                    on c.row_id = r.id and c.props ->> 'colName' = n.props ->> 'colName'
                                          left join ${schemaAssessment}."table" t on t.props ->> 'name' = n.props ->> 'tableName'
                                 where t.props ->> 'name' = '${tableName}'
                                   and t.props -> 'cycles' ? $1
                                   and r.props ->> 'type' in ('data', 'calculated')
                                   and r.props -> 'cycles' ? $1
                                   and c.props ->> 'colName' is not null
                                   and c.props -> 'cycles' ? $1),
           country_values as (select distinct on (country_iso, cv.variable_name, cv.col_name) *
                              from (select *
                                    from country_nodes
                                    union all
                                    select *
                                    from country_node_exts) as cv
                              order by 1, 2, 3, 5),
           region_values as (select cr.region_code as country_iso,
                                    cv.variable_name,
                                    cv.col_name,
                                    jsonb_build_object('raw', text(coalesce(sum((cv.value ->> 'raw')::numeric), 0)), 'faoEstimate', true)
                                    as value
                             from ${schemaCycle}.country_region cr
                                      left join country_values cv using (country_iso)
                             group by cr.region_code, cv.variable_name, cv.col_name),
           global_values as (select 'WO' as country_iso,
                                    variable_name, col_name,
                                    jsonb_build_object('raw', text(coalesce(sum((value ->> 'raw')::numeric), 0)), 'faoEstimate', true)
                                    as value
                      from country_values
                      group by variable_name, col_name)
      select country_iso::varchar(3), variable_name, col_name, value
      from global_values gv
      union all
      select country_iso::varchar(3), variable_name, col_name, value
      from region_values rv
      union all
      select country_iso::varchar(3), variable_name, col_name, value
      from country_values
      order by country_iso, variable_name, col_name
    )
  `,
    [cycle.uuid]
  )
}
