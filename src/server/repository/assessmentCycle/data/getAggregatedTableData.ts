import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RecordCountryData, TablesCondition } from 'meta/data'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  tables: TablesCondition
}

// Only for regions
export const getAggregatedTableData = async (props: Props, client: BaseProtocol = DB): Promise<RecordCountryData> => {
  const { assessment, countryISOs, cycle, tables } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const schemaAssessment = Schemas.getName(assessment)
  const regionCode = countryISOs[0]

  const tableNames = Object.keys(tables)

  // Queries
  const countryNodesQuery = `
      select n.country_iso,
             t.props ->> 'name'          as table_name,
             r.props ->> 'variableName'  as variable_name,
             c.props ->> 'colName'       as col_name,
             n.value,
              1                          as priority
      from ${schemaCycle}.node n
          left join ${schemaAssessment}.row r
      on r.uuid = n.row_uuid
          left join ${schemaAssessment}.col c on c.uuid = n.col_uuid
          left join ${schemaAssessment}."table" t on t.id = r.table_id
      where t.props ->> 'name' in ($1:list)
        and r.props ->> 'type' in ('data', 'calculated')
`

  const countryNodeExtsQuery = `
        select n.country_iso,
            t.props ->> 'name'         as table_name,
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
        where t.props ->> 'name' in ($1:list)
          and t.props -> 'cycles' ? $2
          and r.props ->> 'type' in ('data', 'calculated')
          and r.props -> 'cycles' ? $2
          and c.props ->> 'colName' is not null
          and c.props -> 'cycles' ? $2`

  const countryValuesQuery = `
        select distinct on (country_iso, cv.table_name, cv.variable_name, cv.col_name) *
        from (
            select *
            from country_nodes
            union all
            select *
            from country_node_exts
            ) as cv
        order by 1, 2, 3, 4, 6`

  const regionValuesQuery = `
      select cr.region_code as country_iso,
            table_name,
            cv.variable_name,
            cv.col_name,
            jsonb_build_object('raw',
            text(coalesce(sum((cv.value ->> 'raw')::numeric), 0)), 'faoEstimate', true) as value
      from ${schemaCycle}.country_region cr
            left join country_node_exts cv using (country_iso)
      group by cr.region_code, cv.table_name, cv.variable_name, cv.col_name
        `

  const globalValuesQuery = `
        select 'WO' as country_iso,
            table_name,
            variable_name,
            col_name,
            jsonb_build_object('raw', text(coalesce(sum((value ->> 'raw')::numeric), 0)), 'faoEstimate', true) as value
        from country_node_exts
        group by table_name, variable_name, col_name
        `

  const valuesQuery = `
        with country_nodes as (${countryNodesQuery}),
            country_node_exts as (${countryNodeExtsQuery}),
            country_values as (${countryValuesQuery}),
            region_values as (${regionValuesQuery}),
            global_values as (${globalValuesQuery})
        select country_iso::varchar(3), table_name, variable_name, col_name, value
        from global_values gv
        union all
        select country_iso::varchar(3), table_name, variable_name, col_name, value
        from region_values rv
        union all
        select country_iso::varchar(3), table_name, variable_name, col_name, value
        from country_values
        order by country_iso, table_name, variable_name, col_name
  `

  return client.one<RecordCountryData>(
    `
        with values as (${valuesQuery}),
            agg1 as (
              select
                  a.country_iso,
                  a.table_name,
                  a.col_name,
                  jsonb_object_agg(a.variable_name, a.value) as data
              from values a group by 1, 2, 3),
        
            agg2 as (
                select  a.country_iso,
                        a.table_name,
                        jsonb_object_agg(a.col_name, a.data) as data
                from agg1 a
                group by 1, 2),
        
            agg3 as (
                select  a.country_iso,
                        jsonb_object_agg(a.table_name, a.data) as data
                from agg2 a
                group by 1)
        
        select jsonb_object_agg(a.country_iso, a.data) as data
        from agg3 a
        where country_iso = $3
        ;
    `,
    [tableNames, cycle.uuid, regionCode],
    ({ data }) => data
  )
}
