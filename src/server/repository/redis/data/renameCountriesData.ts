import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { getKeyCountry, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type PropsCache = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycleSource: Cycle
  cycleTarget: Cycle
}

export const renameCountriesData = async (props: PropsCache): Promise<void> => {
  const { assessment, cycleSource, cycleTarget, countryISOs } = props

  const redis = RedisData.getInstance()

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const key = getKeyCountry({ assessment, cycle: cycleSource, countryIso, key: Keys.Data.data })
      const keyNew = getKeyCountry({ assessment, cycle: cycleTarget, countryIso, key: Keys.Data.data })
      await redis.rename(key, keyNew)
    })
  )
}
