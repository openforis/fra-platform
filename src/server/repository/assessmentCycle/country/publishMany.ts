import { Country, CountryStatus } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getMany } from './getMany'

type Props = {
  assessment: Assessment
  cycle: Cycle
  allCountries?: boolean
}

export const publishMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<Country>> => {
  const { assessment, cycle, allCountries } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  const countryIsos = await client.map(
    `
    update ${schemaName}.country
    set last_in_published = now(),
        status = $1
        ${allCountries ? '' : 'where status = $2'}
    returning country_iso
  `,
    [CountryStatus.published, CountryStatus.accepted],
    (row) => row.country_iso
  )

  return getMany({ assessment, cycle, countryIsos }, client)
}
