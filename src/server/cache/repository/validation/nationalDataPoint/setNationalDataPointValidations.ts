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
  nationalDataPointValidations: RecordNDPValidations
}

export const setNationalDataPointValidations = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, nationalDataPointValidations } = props
  const nationalDataPointUuids = Object.keys(nationalDataPointValidations)

  if (Objects.isEmpty(nationalDataPointUuids)) {
    return
  }

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Data.validationNationalDataPoints })

  const validationsToSet = nationalDataPointUuids.reduce<Record<string, string>>((acc, nationalDataPointUuid) => {
    acc[nationalDataPointUuid] = JSON.stringify(nationalDataPointValidations[nationalDataPointUuid] ?? {})
    return acc
  }, {})

  await redis.hmset(key, validationsToSet)
}
