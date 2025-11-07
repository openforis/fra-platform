import { LastPublishedInfo } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { CountryStatus } from 'meta/area/countryStatus'
import { Assessment } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = { assessment: Assessment; countryIso?: CountryIso }

type LastPublishedRecord = Record<CountryIso, LastPublishedInfo>

export const getCountryLastPublishedInfo = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<LastPublishedRecord> => {
  const { assessment, countryIso } = props

  const selectStatements = assessment.cycles
    .map(
      (cycle) =>
        `select country_iso, 
         last_in_published,
         last_update,
         '${cycle.uuid}' as cycle_uuid, 
         '${cycle.name}' as cycle_name
         from ${Schemas.getNameCycle(assessment, cycle)}.country where status = '${CountryStatus.published}' ${
          countryIso ? 'and country_iso = $1' : ''
        }`
    )
    .join(' union all ')

  // Note: lastPublished: from last published country (order by ...last_in_published....)
  // we find the greatest of last update and published timestamp
  const query = `
    with rows as (${selectStatements})
    select jsonb_object_agg(
      country_iso,
      jsonb_build_object(
              'cycleUuid', cycle_uuid,
              'cycleName', cycle_name,
              'lastPublished', greatest(last_in_published, last_update)
      )
    ) as result
    from (
      select distinct on (country_iso)
        country_iso, cycle_uuid, cycle_name, last_in_published, last_update
      from rows
      order by country_iso, last_in_published desc nulls last
    ) q;
  `

  return client.oneOrNone(query, [countryIso], (row) => row.result)
}
