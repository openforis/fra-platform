import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { UUID } from 'meta/uuid/uuid'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { _parseValidation } from 'server/cache/repository/validation/nationalDataPoint/_parseValidation'
import { RedisDataClient } from 'server/redis/dataClient'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

export const getValidations = async (props: Props): Promise<RecordNDPValidations> => {
  const { assessment, countryIso, cycle } = props

  const redis = RedisDataClient.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Validation.nationalDataPoints })
  const nationalDataPointValidations = await redis.hgetall(key)

  return Object.entries(nationalDataPointValidations).reduce<RecordNDPValidations>((acc, [uuid, validations]) => {
    acc[uuid as UUID] = _parseValidation(validations)
    return acc
  }, {})
}
