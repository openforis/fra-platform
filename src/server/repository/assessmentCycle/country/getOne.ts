import { Objects } from 'utils/objects'

import { Country, CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const getOne = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Country> => {
  const { countryIso, assessment, cycle } = props

  const assessmentCycleName = Schemas.getNameCycle(assessment, cycle)

  return client.oneOrNone<Country>(
    `
          select * from ${assessmentCycleName}.country c where c.country_iso = $1
    `,
    [countryIso],
    Objects.camelize
  )
}
