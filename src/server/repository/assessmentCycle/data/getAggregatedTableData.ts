import { RegionCode } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RecordCountryData, TablesCondition } from 'meta/data'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  regionCode: RegionCode
  cycle: Cycle
  tables: TablesCondition
}

// Only for regions
export const getAggregatedTableData = async (props: Props, client: BaseProtocol = DB): Promise<RecordCountryData> => {
  const { assessment, regionCode, cycle, tables } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<RecordCountryData>(
    `
        with agg0 as (
        select $1                          as country_iso
             , ne.props ->> 'tableName'    as table_name
             , ne.props ->> 'variableName' as variable_name
             , ne.props ->> 'colName'      as col_name
             , jsonb_build_object('raw', text(coalesce(sum((ne.value ->> 'raw')::numeric), 0)), 'type', 'node_ext') as value
          from ${schemaCycle}.node_ext ne
          where ne.type = 'node' and ne.value ->> 'faoEstimate' = 'true'
            and ne.props ->> 'tableName' in ($2:list)
            and ne.country_iso in (select country_iso
              from ${schemaCycle}.country_region
              where region_code = $1 and country_iso not ilike 'X%')
          group by ne.props ->> 'variableName', ne.props ->> 'colName', ne.props ->> 'tableName'
          order by 1, 2, 3),
            agg1 as (select a.country_iso, a.col_name, a.table_name, jsonb_object_agg(a.variable_name, a.value) as data from agg0 a group by 1, 2, 3),
            agg2 as (select a.country_iso, a.table_name, jsonb_object_agg(a.col_name, a.data) as data from agg1 a group by 1, 2),
            agg3 as (select a.country_iso, jsonb_object_agg(a.table_name, a.data) as data from agg2 a group by 1)

        select jsonb_object_agg(a.country_iso, a.data) as data
        from agg3 a;
    `,
    [regionCode, Object.keys(tables)],
    ({ data }) => data
  )
}
