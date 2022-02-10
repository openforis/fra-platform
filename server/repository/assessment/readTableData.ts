import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Assessment, Cycle } from '@meta/assessment'
import { CountryIso } from '@meta/area'
import { TableData } from '@meta/data'

export const readTableData = async (
  props: {
    assessment: Assessment
    countryIso: CountryIso
    cycleName: string
    tableName: string
  },
  client: BaseProtocol = DB
): Promise<{
  data: TableData
}> => {
  const { tableName, countryIso, assessment, cycleName } = props
  const schemaCycleName = Schemas.getNameCycle(assessment, { name: cycleName } as Cycle)
  return client
    .one<{
      data: TableData
    }>(
      `
          with data as (
              select *
--                      d.country_iso,
--                      d.variable_name,
                     -- Column Selections
--                      d."1990",
--                      d."2000",
--                      d."2010",
--                      d."2015",
--            d."2016",
--            d."2017",
--            d."2018",
--            d."2019",
--                      d."2020"
              from ${schemaCycleName}.${tableName} as d -- Table selection
              where country_iso in ($1:csv)   -- Countries selection
--                 and variable_name in ($_2:csv) -- Variables selection
              order by d.country_iso
          ),
               agg1 as (
                   select d.country_iso,
                          jsonb_object_agg(d.variable_name, d.*) as data
                   from data as d
                   group by d.country_iso
                   order by d.country_iso
               )
          select jsonb_object_agg(a.country_iso, a.data) as data
          from agg1 a;
      `,
      [[countryIso] /* variable */]
    )
    .then(Objects.camelize)
}
