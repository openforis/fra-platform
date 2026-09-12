import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { UUID } from 'meta/uuid/uuid'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { _parseValidation } from 'server/cache/repository/validation/nationalDataPoint/_parseValidation'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  uuid: UUID
}

export const getValidation = async (props: Props): Promise<NDPValidation> => {
  const { assessment, countryIso, cycle, uuid } = props

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Validation.nationalDataPoints })
  const validation = await redis.hget(key, uuid)

  return _parseValidation(validation)
}
