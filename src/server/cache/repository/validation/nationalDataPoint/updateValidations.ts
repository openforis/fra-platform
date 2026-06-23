import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { NationalDataPointValidations } from 'meta/assessment/validation/nationalDataPointValidations'
import { Objects } from 'utils/objects'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { _parseValidation } from 'server/cache/repository/validation/nationalDataPoint/_parseValidation'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  nationalDataPointValidations: RecordNDPValidations
}

export const updateValidations = async (props: Props): Promise<RecordNDPValidations> => {
  const { assessment, countryIso, cycle, nationalDataPointValidations } = props
  const nationalDataPointUuids = Object.keys(nationalDataPointValidations)

  if (Objects.isEmpty(nationalDataPointUuids)) {
    return {}
  }

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Data.validationNationalDataPoints })
  const currentValues = await redis.hmget(key, ...nationalDataPointUuids)

  const updatedNationalDataPointValidations = nationalDataPointUuids.reduce<RecordNDPValidations>(
    (acc, nationalDataPointUuid, index) => {
      const current = _parseValidation(currentValues[index])
      const update = nationalDataPointValidations[nationalDataPointUuid] ?? {}

      acc[nationalDataPointUuid] = NationalDataPointValidations.mergeValidations({ current, update })
      return acc
    },
    {}
  )

  const validationsToSet = nationalDataPointUuids.reduce<Record<string, string>>((acc, nationalDataPointUuid) => {
    acc[nationalDataPointUuid] = JSON.stringify(updatedNationalDataPointValidations[nationalDataPointUuid] ?? {})
    return acc
  }, {})

  await redis.hmset(key, validationsToSet)

  return updatedNationalDataPointValidations
}
