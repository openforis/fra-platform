import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = { assessment: Assessment; countryIso?: CountryIso }

type LastPublishedRecord = Record<CountryIso, { lastPublishedCycleUuid: string; lastPublishedCycleTimestamp: string }>

export const getCountryLastPublished = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<LastPublishedRecord> => {
  const { assessment, countryIso } = props

  const selectStatements = assessment.cycles
    .map(
      (cycle) =>
        `select country_iso, last_in_published, '${cycle.uuid}' as cycle_uuid from ${Schemas.getNameCycle(
          assessment,
          cycle
        )}.country ${countryIso ? 'where country_iso = $1' : ''}`
    )
    .join(' union all ')

  const query = `
    with rows as (${selectStatements})
    select jsonb_object_agg(
      country_iso,
      jsonb_build_object(
              'lastPublishedCycleUuid', cycle_uuid,
              'lastPublishedCycleTimestamp', last_in_published
      )
    ) as result
    from (
      select distinct on (country_iso)
        country_iso,
        cycle_uuid,
        last_in_published
      from rows
      order by country_iso, last_in_published desc nulls last
    ) q;
  `

  return client.oneOrNone(query, [countryIso], (row) => row.result)
}
