import * as pgPromise from 'pg-promise'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  excludedLinks: Array<{ countryIso: CountryIso; link: string }>
}

export const markDeletedMany = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, excludedLinks } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const pgp = pgPromise()

  const excludedLinkValues = pgp.helpers.values(excludedLinks, ['countryIso', 'link'])

  let query = `
    update ${schemaCycle}.link
    set props = jsonb_set(props, '{deleted}', case when (country_iso, link) in ($1:raw) then 'false'::jsonb else 'true'::jsonb end)
  `
  if (excludedLinks.length === 0) {
    query = `
    update ${schemaCycle}.link
    set props = jsonb_set(props, '{deleted}', 'true'::jsonb)
    `
  }

  return client.query(query, [excludedLinkValues])
}
