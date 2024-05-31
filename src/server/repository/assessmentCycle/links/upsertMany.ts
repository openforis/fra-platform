import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { Link, LinkProps, VisitedLink } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  linkVisits: Array<VisitedLink>
}

export const upsertMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<Link>> => {
  const { assessment, cycle, linkVisits } = props
  if (linkVisits.length === 0) {
    return []
  }

  const values = linkVisits.map((visit) => {
    const { code, countryIso, link, locations, name, timestamp } = visit

    const visitInfo = { code, timestamp }
    const initialProps: LinkProps = {
      name,
    }

    return {
      country_iso: countryIso,
      link: link ?? '',
      locations: JSON.stringify(locations),
      props: JSON.stringify(initialProps),
      visits: JSON.stringify([visitInfo]),
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
    set visits = link.visits || excluded.visits,
    locations = excluded.locations,
    props = link.props || excluded.props
    returning *`

  return client.map<Link>(query, [], (row) => Objects.camelize(row))
}
