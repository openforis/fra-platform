import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { TableData } from '@meta/data'

import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@openforis/arena-core'

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
                                   'forest', json_build_object('raw', o.forest::varchar),
                                   'other_wooded_land', json_build_object('raw', o.other_wooded_land::varchar),
                                   'natural_forest_area', json_build_object('raw', o.natural_forest_area::varchar),
                                   'plantation_forest_area', json_build_object('raw', o.plantation_forest_area::varchar),
                                   'plantation_forest_introduced_area',
                                   json_build_object('raw', o.plantation_forest_introduced_area::varchar),
                                   'other_planted_forest_area', json_build_object('raw', o.other_planted_forest_area::varchar),
                                   'planted_forest', json_build_object('raw', o.planted_forest::varchar),
                                   'total', json_build_object('raw', o.total::varchar)
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
