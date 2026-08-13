import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { Objects } from 'utils/objects'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  validations: RecordNDPValidations
}

export const setValidations = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, validations } = props
  const nationalDataPointUuids = Object.keys(validations)

  if (Objects.isEmpty(nationalDataPointUuids)) {
    return
  }

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Data.validationNationalDataPoints })

  const validationsToSet = nationalDataPointUuids.reduce<Record<string, string>>((acc, nationalDataPointUuid) => {
    acc[nationalDataPointUuid] = JSON.stringify(validations[nationalDataPointUuid] ?? {})
    return acc
  }, {})

  await redis.hmset(key, validationsToSet)
}
