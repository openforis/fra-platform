import { CountryIso } from 'meta/area'
import { LastPublishedInfo } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

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
        `select country_iso, last_in_published, '${cycle.uuid}' as cycle_uuid, '${cycle.name}' as cycle_name
         from ${Schemas.getNameCycle(assessment, cycle)}.country ${countryIso ? 'where country_iso = $1' : ''}`
    )
    .join(' union all ')

  const query = `
    with rows as (${selectStatements})
    select jsonb_object_agg(
      country_iso,
      jsonb_build_object(
              'cycleUuid', cycle_uuid,
              'cycleName', cycle_name,
              'lastPublished', last_in_published
      )
    ) as result
    from (
      select distinct on (country_iso)
        country_iso, cycle_uuid, cycle_name, last_in_published
      from rows
      order by country_iso, last_in_published desc nulls last
    ) q;
  `

  return client.oneOrNone(query, [countryIso], (row) => row.result)
}
