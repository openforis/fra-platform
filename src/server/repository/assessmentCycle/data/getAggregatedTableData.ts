import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RecordCountryData, TablesCondition } from 'meta/data'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { getFaoEstimateViewName } from 'server/repository/assessmentCycle/data/getFaoEstimateViewName'

const asQueryStringArray = (arr: any[]) => `(${arr.map((v) => `'${v}'`).join(',')})`

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

  return client.one<RecordCountryData>(
    `
        with agg0 as (
            ${Object.entries(tables).map(([tableName, tableProps]) => {
              return `(
               select e.country_iso,
                 '${tableName}' as table_name,
                 e.col_name,
                 jsonb_object_agg(e.variable_name, e.value) as data
          from ${getFaoEstimateViewName(schemaCycle, tableName)}" e
          where e.country_iso in ($1:csv)
              ${
                tableProps?.columns && tableProps?.columns?.length
                  ? `and e.col_name in ${asQueryStringArray(tableProps.columns)}`
                  : ''
              }
              ${
                tableProps?.variables && tableProps?.variables?.length
                  ? `and e.variable_name in ${asQueryStringArray(tableProps.variables)}`
                  : ''
              }
              and e.col_name is not null
          group by 1, 2, 3
            )`
            }).join(`
          union
          `)}
            ),
       agg1 as (
           select a.country_iso,
                  a.table_name,
                  jsonb_object_agg(a.col_name, a.data) as data
           from agg0 a
           group by 1, 2
       ),
       agg2 as (
           select a.country_iso,
                  jsonb_object_agg(a.table_name, a.data) as data
           from agg1 a
           group by 1
       )
  select jsonb_object_agg(a.country_iso, a.data) as data
  from agg2 a;
    `,
    [countryISOs],
    ({ data }) => data
  )
}
