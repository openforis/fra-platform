import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DescriptionIdentifier } from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type LocationToRemove = DescriptionIdentifier & {
  path: Array<string>
}

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  locations: Array<LocationToRemove>
}

export const removeLocations = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, countryIso, cycle, locations } = props

  if (Objects.isEmpty(locations)) return

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const params = { countryIso, locations: JSON.stringify(locations) }

  return client.query(
    `
      with locations_to_remove as (
        -- Turn the JSON input into rows so each stored location can be matched by description identifier and path.
        select
          location.value ->> 'name' as name,
          location.value ->> 'sectionName' as section_name,
          location.value -> 'path' as path
        from jsonb_array_elements($(locations)::jsonb) as location(value)
      ),
      updated_links as (
        select
          link.id,
          coalesce(
            -- Rebuild the locations array without the removed description locations.
            -- Ordinality keeps the remaining locations in their original order.
            jsonb_agg(location.value order by location.ordinality) filter (
              where not exists (
                select
                from locations_to_remove
                where location.value ->> 'descriptionName' = locations_to_remove.name
                  and location.value ->> 'sectionName' = locations_to_remove.section_name
                  and location.value -> 'path' = locations_to_remove.path
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
