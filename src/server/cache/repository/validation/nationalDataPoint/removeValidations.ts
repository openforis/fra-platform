import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisDataClient } from 'server/redis/dataClient'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

export const removeValidations = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle } = props

  const redis = RedisDataClient.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Validation.nationalDataPoints })

  await redis.del(key)
}
