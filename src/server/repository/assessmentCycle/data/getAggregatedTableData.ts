import { Areas, CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RecordCountryData } from 'meta/data'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  variables: string[]
  columns: string[]
}
// Only for regions
export const getAggregatedTableData = async (props: Props, client: BaseProtocol = DB): Promise<RecordCountryData> => {
  const { assessment, countryISOs, cycle, variables, columns } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const isRegion = Areas.isRegion(countryISOs[0])
  const isGlobal = Areas.isGlobal(countryISOs[0])
  const isArea = isGlobal || isRegion

  let _countryISOs: Array<CountryIso>

  if (isRegion) {
    _countryISOs = await client.map<CountryIso>(
      `select country_iso from ${schemaCycle}.country_region where region_code = $1`,
      [countryISOs[0]],
      (res) => res.country_iso
    )
  }

  if (isGlobal) {
    _countryISOs = await client.map<CountryIso>(`select country_iso from ${schemaCycle}.country`, [], (res) => res.country_iso)
  }

  // totalLandArea only for year 2015
  const shouldAppend2015 = variables.includes('totalLandArea') && !columns.includes('2015')
  const _columns = shouldAppend2015 ? [...columns, '2015'] : columns

  return client.one<RecordCountryData>(
    `
      with agg0 as (

          select ${isArea ? `'${countryISOs[0]}'` : 'country_iso'} as country_iso,
                 jsonb_object_agg('raw', x.raw_sum) as value,
          col_name,
          variable_name

      from (select variable_name,
          col_name,
          sum(coalesce((value ->> 'raw')::numeric, 0)) AS "raw_sum"
          from  ${schemaCycle}.value_aggregate va
          where va.country_iso in ($1:list)
          and va.col_name in ($2:list)
          and va.variable_name in ($3:list)
          group by 1, 2) as x
      group by 3, 4
      ),
       agg1 as (
               select a.country_iso,
                 'value_aggregate' as table_name,
                 a.col_name,
                 jsonb_object_agg(a.variable_name, a.value) as data
          from agg0 a
          group by 1, 2, 3
          
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
    [isArea ? _countryISOs : countryISOs, _columns, variables],
    ({ data }) => data
  )
}
