import { Objects } from 'utils/objects'

import { CountryIso, CountrySummary } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { fieldsJoined } from './fields'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

export const getOneOrNone = async (props: Props, client: BaseProtocol = DB): Promise<CountrySummary | null> => {
  const { assessment, countryIso, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.oneOrNone<CountrySummary>(
    `
        select ${fieldsJoined('cs')}, c.status
        from ${schemaCycle}.country_summary cs
                    left join ${schemaCycle}.country c using country_iso
        where cs.country_iso = $1
    `,
    [countryIso],
    Objects.camelize
  )
}
