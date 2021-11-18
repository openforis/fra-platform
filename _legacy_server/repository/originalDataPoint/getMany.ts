import { ODP } from '@core/odp'
import { Objects } from '@core/utils'
import { BaseProtocol, DB } from '@server/db'

export const getManyNormalized = async (
  props: { countryIso: string },
  client: BaseProtocol = DB
): Promise<Array<ODP>> => {
  const { countryIso } = props

  const odps = await client.manyOrNone(
    `
        select o.id,
               o.id  as odp_id, -- check for next refactor
               o.year,
               o.country_iso,
               o.data_source_methods,
               o.forest_area,
               o.natural_forest_area,
               o.other_planted_forest_area,
               o.other_wooded_land_area,
               o.plantation_forest_area,
               o.plantation_forest_introduced_area,
               'odp' as type
        from original_data_point_view o
        where o.country_iso = $1
        order by o.year
    `,
    [countryIso]
  )

  return Objects.camelize(odps)
}

export const getMany = async (props: { countryIso: string }, client: BaseProtocol = DB): Promise<Array<ODP>> => {
  const { countryIso } = props

  const odps = await client.manyOrNone(
    `
        select o.id,
               o.year,
               o.country_iso,
               o.data_source_methods,
               o.data_source_additional_comments,
               o.data_source_references,
               o.description,
               o.national_classes
        from original_data_point o
        where o.country_iso = $1
        order by o.year    
    `,
    [countryIso]
  )

  return Objects.camelize(odps)
}
