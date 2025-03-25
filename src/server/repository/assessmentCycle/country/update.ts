import { Country, CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getOne } from './getOne'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  countryIso?: CountryIso
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<Country> => {
  const { country, countryIso, assessment, cycle } = props

  const assessmentCycleName = Schemas.getNameCycle(assessment, cycle)

  const { status, ...countryProps } = country.props

  await client.none(
    `
        update ${assessmentCycleName}.country
        set props = $2,
            status = $3
        where country_iso = $1
    `,
    [countryIso ?? country.countryIso, countryProps, status]
  )

  return getOne({ assessment, cycle, countryIso })
}
