import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { TableData } from '@meta/data'
import { Objects } from '@core/utils'

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

export const getTableData = (props: Props, client: BaseProtocol = DB): Promise<TableData> => {
  const { assessment, cycle, countryISOs, tables } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<TableData>(
    `
        with data as (
            ${Object.entries(tables).map(([tableName, tableProps]) => {
              return `(
                select ${
                  tableProps.columns
                    ? `
                    d.country_iso,
                    '${tableName}'::text as table_name,
                    d.variable_name,
                    ${tableProps.columns.map((col) => `d."${col}"`).join(`,
                    `)}
                    `
                    : `d.*, '${tableName}'::text as table_name`
                }
                from ${schemaCycle}.${tableName} as d
                where country_iso in (${countryISOs.map((c) => `'${c}'`).join(', ')})
                ${
                  tableProps.variables
                    ? ` and variable_name in (${tableProps.variables.map((v) => `'${v}'`).join(',')})`
                    : ''
                }
                order by d.country_iso
              )`
            }).join(`
            union
            `)}
        ),
             agg1 as (
                 select d.country_iso,
                        d.table_name,
                        jsonb_object_agg(d.variable_name,
                                         to_jsonb(d.*) - 'country_iso' - 'variable_name' - 'table_name') as data
                 from data as d
                 group by 1, 2
                 order by 1, 2
             )
                ,
             agg2 as (
                 select d.country_iso,
                        jsonb_object_agg(d.table_name, to_jsonb(d.data) - 'table_name') as data
                 from agg1 as d
                 group by 1
                 order by 1
             )
        select jsonb_object_agg(d.country_iso, d.data) as data
        from agg2 d
    `,
    [],
    ({ data }) => Objects.camelize(data)
  )
}
