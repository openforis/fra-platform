import pgPromise from 'pg-promise'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Link, LinkProps, LinkToVisit, LinkVisit, VisitedLink } from 'meta/cycleData/links/link'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  linkVisits: Array<VisitedLink>
  linksToVisit: Array<LinkToVisit>
}

export const upsertLinks = async (props: Props, client: BaseProtocol = DB): Promise<Array<Link>> => {
  const { assessment, cycle, linkVisits, linksToVisit } = props
  if (Objects.isEmpty(linksToVisit)) return []

  const linkVisitsByKey = linkVisits.reduce<Record<string, LinkVisit>>((acc, visit) => {
    acc[`${visit.countryIso}_${visit.link ?? ''}`] = { code: visit.code, timestamp: visit.timestamp }
    return acc
  }, {})

  const values = linksToVisit.map((linkToVisit) => {
    const { countryIso, link, locations, name } = linkToVisit
    const visit = linkVisitsByKey[`${countryIso}_${link ?? ''}`]
    const initialProps: LinkProps = { deleted: false, name }

    return {
      country_iso: countryIso,
      link: link ?? '',
      locations: JSON.stringify(locations),
      props: JSON.stringify(initialProps),
      visits: JSON.stringify(visit ? [visit] : []),
    }
  })

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const pgp = pgPromise()
  const columns = [
    'country_iso',
    { name: 'link', cast: 'varchar(2048)' },
    { name: 'locations', cast: 'jsonb' },
    { name: 'props', cast: 'jsonb' },
    { name: 'visits', cast: 'jsonb' },
  ]
  const table = { table: 'link', schema: schemaCycle }
  const cs = new pgp.helpers.ColumnSet(columns, { table })

  const query = `${pgp.helpers.insert(values, cs)}
    on conflict (country_iso, link) do update
    set visits = case
      when jsonb_array_length(excluded.visits) > 0 then link.visits || excluded.visits
      else link.visits
    end,
    locations = (
      select coalesce(jsonb_agg(distinct location), '[]'::jsonb)
      from jsonb_array_elements(coalesce(link.locations, '[]'::jsonb) || excluded.locations) as location
    ),
    props = jsonb_set(link.props || excluded.props, '{deleted}', 'false'::jsonb, true)
    returning *`

  return client.map<Link>(query, [], (row) => Objects.camelize(row))
}
