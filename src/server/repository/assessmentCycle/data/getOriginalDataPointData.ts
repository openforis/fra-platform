import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { TableData } from '@meta/data'

import { BaseProtocol, DB, Schemas } from '@server/db'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
}

export const getOriginalDataPointData = (props: Props, client: BaseProtocol = DB): Promise<TableData> => {
  const { assessment, cycle, countryISOs } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<TableData>(
    `
        with data as (
            select o.country_iso,
                   jsonb_object_agg(
                           o.year,
                           json_build_object(
                                   'forest_area', json_build_object('raw', o.forest_area::varchar, 'odp', true, 'odpId', o.id::varchar),
                                   'other_wooded_land', json_build_object('raw', o.other_wooded_land::varchar, 'odp', true, 'odpId', o.id::varchar),
                                   'natural_forest_area', json_build_object('raw', o.natural_forest_area::varchar, 'odp', true, 'odpId', o.id::varchar),
                                   'plantation_forest_area', json_build_object('raw', o.plantation_forest_area::varchar, 'odp', true, 'odpId', o.id::varchar),
                                   'plantation_forest_introduced_area', json_build_object('raw', o.plantation_forest_introduced_area::varchar, 'odp', true, 'odpId', o.id::varchar),
                                   'other_planted_forest_area', json_build_object('raw', o.other_planted_forest_area::varchar, 'odp', true, 'odpId', o.id::varchar),
                                   'planted_forest', json_build_object('raw', o.planted_forest::varchar, 'odp', true, 'odpId', o.id::varchar),
                                   'total', json_build_object('raw', o.total::varchar, 'odp', true, 'odpId', o.id::varchar),
                                   'total_land_area', json_build_object('raw', o.total_land_area::varchar, 'odp', true, 'odpId', o.id::varchar),
                                   'other_land', json_build_object('raw', o.other_land::varchar, 'odp', true, 'odpId', o.id::varchar),
                                   'total_forest_area', json_build_object('raw', o.total_forest_area::varchar, 'odp', true, 'odpId', o.id::varchar),
                                   'primary_forest', json_build_object('raw', o.primary_forest::varchar, 'odp', true, 'odpId', o.id::varchar)
                               )
                       ) as values
        from ${schemaCycle}.original_data_point_data o
        where o.year is not null
          and o.country_iso in ($1:list)
        group by o.country_iso
            )
        select jsonb_object_agg(d.country_iso, json_build_object('original_data_point_value', d.values)) as data
        from data d;
    `,
    [countryISOs],
    ({ data }) => Objects.camelize(data)
  )
}
