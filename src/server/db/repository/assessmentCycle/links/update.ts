import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Link } from 'meta/cycleData/links/link'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
  link: Link
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<Link> => {
  const { assessment, countryIso, cycle, link } = props
  const { props: _props, uuid } = link

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const hasCountryIso = !Objects.isEmpty(countryIso)
  const countryIsoCondition = hasCountryIso ? `and country_iso = $(countryIso)` : ''

  return client.one<Link>(
    `
      update ${schemaCycle}.link
      set props = $(props)
      where uuid = $(uuid)
      ${countryIsoCondition}
      returning *
    `,
    { countryIso, props: _props, uuid },
    (row) => Objects.camelize(row)
  )
}
