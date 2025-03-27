import { Country } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getOne } from './getOne'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<Country> => {
  const { country, assessment, cycle } = props
  const { countryIso } = country

  const assessmentCycleName = Schemas.getNameCycle(assessment, cycle)

  const { status, ...countryProps } = country.props

  await client.none(
    `
        update ${assessmentCycleName}.country
        set props = $2,
            status = $3
        where country_iso = $1
    `,
    [countryIso, countryProps, status]
  )

  return getOne({ assessment, cycle, countryIso })
}
