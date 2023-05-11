import { Assessment, Cycle, Table, TableNames } from '@meta/assessment'

import { getOriginalDataPointVariables } from '@server/controller/cycleData/getOriginalDataPointVariables'
import { Schemas, Tables } from '@server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  table: Table
}

export const getTableDataWithODPCreateViewDDL = (props: Props): string => {
  const { assessment, cycle, table } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const tableName = table.props.name
  const odpVariables = getOriginalDataPointVariables(cycle).filter((variable) => variable.tableName === tableName)

  const query = `
create or replace view ${schemaCycle}.${Tables.getTableDataWithOdpViewName({ tableName })} as
(
with config as (select c.country_iso,
${
  tableName === TableNames.forestCharacteristics
    ? `coalesce(jsonb_extract_path_text(c.props,'forestCharacteristics','useOriginalDataPoint'),'false') = 'true'`
    : `true`
}                       as use_odp
                from ${schemaCycle}.country c),
     table_data as (select case when c.use_odp then 2 else 1 end as priority, d.*
                    from ${schemaCycle}.${tableName} d
                             left join config c
                                       on c.country_iso = d.country_iso),
     odp_data as (with data_raw as (select d.country_iso,
                                           replace(initcap(replace(jsonb_object_keys(to_jsonb(d.*)), '_', ' ')), ' ',
                                                   '')                      as variable_name,
                                           jsonb_object_keys(to_jsonb(d.*)) as variable_name_orig,
                                           d.year::text                     as col_name,
                                           to_jsonb(d.*)                    as odp
                                    from ${schemaCycle}.original_data_point_data d),
                       data as (select d.country_iso,
                                       lower(left(d.variable_name, 1)) || right(d.variable_name, -1) as variable_name,
                                       d.variable_name_orig,
                                       d.col_name,
                                       d.odp
                                from data_raw d)
                  select case when c.use_odp then 1 else 2 end                                           as priority,
                         d.country_iso,
                         d.variable_name,
                         d.col_name,
                         jsonb_build_object('raw', jsonb_extract_path_text(d.odp, d.variable_name_orig)) as value
                  from data d
                           left join config c
                                     on c.country_iso = d.country_iso
                  where d.variable_name in (${odpVariables.map(({ variableName }) => `'${variableName}'`).join(',')})),
     data as (SELECT d.*, row_number() OVER (PARTITION BY d.country_iso, d.variable_name, d.col_name) AS row_number
              from ( (select *
                      from table_data
                      union
                      select *
                      from odp_data)
                  order by 1,2,3,4) as d)
select d.country_iso,
       d.variable_name,
       d.col_name,
       d.value
from data d
where d.row_number = 1
order by 1, 2, 3
);
`
  return query
}
