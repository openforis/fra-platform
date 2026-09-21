import pgPromise from 'pg-promise'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
  excludedLinks: Array<{ countryIso: CountryIso; link: string }>
}

export const markDeletedMany = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, countryIso, cycle, excludedLinks } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const pgp = pgPromise()

  const excludedLinkValues = pgp.helpers.values(excludedLinks, ['countryIso', 'link'])
  const countryIsoCondition = Objects.isEmpty(countryIso) ? '' : 'where country_iso = $(countryIso)'

  let query = `
    update ${schemaCycle}.link
    set props = jsonb_set(props, '{deleted}', case when (country_iso, link) in ($(excludedLinkValues:raw)) then 'false'::jsonb else 'true'::jsonb end)
    ${countryIsoCondition}
  `
  if (excludedLinks.length === 0) {
    query = `
    update ${schemaCycle}.link
    set props = jsonb_set(props, '{deleted}', 'true'::jsonb)
    ${countryIsoCondition}
    `
  }

  return client.query(query, { countryIso, excludedLinkValues })
}
