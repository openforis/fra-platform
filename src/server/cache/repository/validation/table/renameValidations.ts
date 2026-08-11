import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycleSource: Cycle
  cycleTarget: Cycle
}

export const renameValidations = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycleSource, cycleTarget } = props

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle: cycleSource, key: Keys.Data.validationTables })
  const keyNew = getKeyCountry({ assessment, countryIso, cycle: cycleTarget, key: Keys.Data.validationTables })

  // redis.rename throws when the source key is missing
  const exists = await redis.exists(key)
  if (exists === 0) return

  await redis.rename(key, keyNew)
}
