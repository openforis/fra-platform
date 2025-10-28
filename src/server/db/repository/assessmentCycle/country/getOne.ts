import { Objects } from 'utils/objects'

import { Country, CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db/db'
import { getBaseQuery } from 'server/db/repository/assessmentCycle/country/_queries/getBaseQuery'

export const getOne = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Country> => {
  const { assessment, countryIso, cycle } = props

  return client.oneOrNone<Country>(getBaseQuery({ assessment, cycle, countryIso }), [countryIso], Objects.camelize)
}
