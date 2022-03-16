import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { TableData } from '@meta/data'

import { BaseProtocol, DB, Schemas } from '@server/db'

export type TablesCondition = Record<string, { variables?: Array<string>; columns?: Array<string> }>

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  /**
   * Pass undefined variables or columns to fetch all
   * e.g. {extentOfForest:{}} --> fetches all rows, all cols for extentOfForest table
   * e.g. {extentOfForest:{variables:['forestArea'],columns:['1990']"}} --> fetches row forestArea and col 1990 for extentOfForest table
   */
  tables: TablesCondition
}

const asQueryStringArray = (arr: any[]) => `(${arr.map((v) => `'${v}'`).join(',')})`

export const getTableData = (props: Props, client: BaseProtocol = DB): Promise<TableData> => {
  const { assessment, cycle, countryISOs, tables } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<TableData>(
    `
      with agg1 as (
          ${Object.entries(tables).map(([tableName, tableProps]) => {
            return `(
               select e.country_iso,
                 '${tableName}' as table_name,
                 e.col_name,
                 jsonb_object_agg(e.variable_name, e.value) as data
          from ${schemaCycle}.${tableName} e
          where e.country_iso in ($1:csv)
              ${tableProps?.columns ? `and e.col_name in ${asQueryStringArray(tableProps.columns)}` : ''}
              ${tableProps?.variables ? `and e.variable_name in ${asQueryStringArray(tableProps.variables)}` : ''}
          group by 1, 2, 3
            )`
          }).join(`
          union
          `)}
      ),
       agg2 as (
           select a.country_iso,
                  a.table_name,
                  jsonb_object_agg(a.col_name, a.data) as data
           from agg1 a
           group by 1, 2
       ),
       agg3 as (
           select a.country_iso,
                  jsonb_object_agg(a.table_name, a.data) as data
           from agg2 a
           group by 1
       )
  select jsonb_object_agg(a.country_iso, a.data) as data
  from agg3 a;
    `,
    [countryISOs]
  )
}
