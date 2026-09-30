import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { LinkLocationKey } from 'meta/cycleData/links/link'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  locations: Array<LinkLocationKey>
}

export const removeLocations = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, countryIso, cycle, locations } = props

  if (Objects.isEmpty(locations)) return

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const params = { countryIso, locations: JSON.stringify(locations) }

  return client.query(
    `
      with updated_links as (
        select
          link.id,
          coalesce(
            -- Rebuild the locations array without the removed locations.
            -- Ordinality keeps the remaining locations in their original order.
            jsonb_agg(location.value order by location.ordinality) filter (
              where not exists (
                select
                from jsonb_array_elements($(locations)::jsonb) as location_to_remove(value)
                -- A stored location is removed when it matches every field of one of the locations to remove.
                where location.value @> location_to_remove.value
              )
            ),
            '[]'::jsonb
          ) as locations
        from ${schemaCycle}.link
             cross join lateral jsonb_array_elements(coalesce(link.locations, '[]'::jsonb))
               with ordinality as location(value, ordinality)
        where link.country_iso = $(countryIso)
        group by link.id
      )
      update ${schemaCycle}.link as link
      set
        locations = updated_links.locations,
        -- Links with no remaining locations are treated as deleted.
        props = jsonb_set(
          coalesce(link.props, '{}'::jsonb),
          '{deleted}',
          to_jsonb(jsonb_array_length(updated_links.locations) = 0),
          true
        )
      from updated_links
      where link.id = updated_links.id
        -- Update only changed links
        and link.locations is distinct from updated_links.locations
    `,
    params
  )
}
