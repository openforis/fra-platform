import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NDPValidation, RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { UUID } from 'meta/uuid/uuid'
import { Objects } from 'utils/objects'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

const _parseNationalDataPointValidation = (value?: string | null): NDPValidation => {
  if (Objects.isEmpty(value)) {
    return {}
  }

  return JSON.parse(value)
}

export const getNationalDataPointValidations = async (props: Props): Promise<RecordNDPValidations> => {
  const { assessment, countryIso, cycle } = props

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Data.validationNationalDataPoints })
  const nationalDataPointValidations = await redis.hgetall(key)

  return Object.entries(nationalDataPointValidations).reduce<RecordNDPValidations>((acc, [uuid, validations]) => {
    acc[uuid as UUID] = _parseNationalDataPointValidation(validations)
    return acc
  }, {})
}
