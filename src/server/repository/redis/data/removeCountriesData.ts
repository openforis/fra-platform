import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { getKeyCountry, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type PropsCache = {
  assessment: Assessment
  cycle: Cycle
  countryISOs: Array<CountryIso>
}

export const removeCountriesData = async (props: PropsCache): Promise<void> => {
  const { assessment, cycle, countryISOs } = props

  const redis = RedisData.getInstance()

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const key = getKeyCountry({ assessment, cycle, countryIso, key: Keys.Data.data })
      await redis.del(key)
    })
  )
}
