import { Country, CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { AreaRedisRepository } from 'server/repository/redis/area'

export const update = async (
  props: { country: Country; countryIso?: CountryIso; assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Country> => {
  const { country, countryIso, assessment, cycle } = props

  const assessmentCycleName = Schemas.getNameCycle(assessment, cycle)

  const { status, ...countryProps } = country.props

  await client.one<Country>(
    `
        update ${assessmentCycleName}.country
        set props = $2
        where country_iso = $1

    `,
    [countryIso ?? country.countryIso, countryProps, status]
  )

  return AreaRedisRepository.getOneCountry({ assessment, cycle, countryIso, force: true })
}
