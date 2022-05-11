import { Objects } from '@openforis/arena-core'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { TableData } from '@meta/data'

import { BaseProtocol, DB, Schemas } from '@server/db'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

export const getOriginalDataPointData = (props: Props, client: BaseProtocol = DB): Promise<TableData> => {
  const { assessment, cycle, countryIso } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<TableData>(
    `
        with data as (
            select o.country_iso,
                   jsonb_object_agg(
                           o.year,
                           json_build_object(
                                   'forest_area', json_build_object('raw', o.forest_area::varchar, 'odp', true),
                                   'other_wooded_land', json_build_object('raw', o.other_wooded_land::varchar, 'odp', true),
                                   'natural_forest_area', json_build_object('raw', o.natural_forest_area::varchar, 'odp', true),
                                   'plantation_forest_area', json_build_object('raw', o.plantation_forest_area::varchar, 'odp', true),
                                   'plantation_forest_introduced_area',
                                   json_build_object('raw', o.plantation_forest_introduced_area::varchar, 'odp', true),
                                   'other_planted_forest_area', json_build_object('raw', o.other_planted_forest_area::varchar, 'odp', true),
                                   'planted_forest', json_build_object('raw', o.planted_forest::varchar, 'odp', true),
                                   'total', json_build_object('raw', o.total::varchar, 'odp', true),
                                   'total_land_area', json_build_object('raw', o.total_land_area::varchar, 'odp', true),
                                   'other_land', json_build_object('raw', o.other_land::varchar, 'odp', true),
                                   'total_forest_area', json_build_object('raw', o.total_forest_area::varchar, 'odp', true)
                               )
                       ) as values
        from ${schemaCycle}.original_data_point_data o
        where o.country_iso = $1
        group by o.country_iso
            )
        select jsonb_object_agg(d.country_iso, json_build_object('original_data_point_value', d.values)) as data
        from data d
        group by d.country_iso;
    `,
    [countryIso],
    ({ data }) => Objects.camelize(data)
  )
}
