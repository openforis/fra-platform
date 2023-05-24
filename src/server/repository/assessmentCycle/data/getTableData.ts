import { CountryIso } from '@meta/area'
import { Assessment, Cycle, VariableCache } from '@meta/assessment'
import { RecordCountryData } from '@meta/data'

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
  /**
   * Merge dependencies to tables condition
   */
  dependencies?: Array<VariableCache>
}

const asQueryStringArray = (arr: any[]) => `(${arr.map((v) => `'${v}'`).join(',')})`

const mergeDependencies = (props: Props): TablesCondition => {
  const { dependencies, tables } = props

  if (dependencies && dependencies.length) {
    dependencies.forEach((d) => {
      if (!tables[d.tableName]) {
        tables[d.tableName] = { variables: [] }
      }
      const { variables } = tables[d.tableName]
      if (!tables[d.tableName]) tables[d.tableName] = {}
      if (d.variableName && !variables.find((v) => v === d.variableName)) {
        variables.push(d.variableName)
      }
      tables[d.tableName] = { variables }
    })
  }

  return tables
}

export const getTableData = (props: Props, client: BaseProtocol = DB): Promise<RecordCountryData> => {
  const { assessment, cycle, countryISOs } = props
  const tables = mergeDependencies(props)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<RecordCountryData>(
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
    [countryISOs],
    ({ data }) => data ?? {}
  )
}
