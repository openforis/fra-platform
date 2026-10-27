import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisDataClient } from 'server/service/redis/dataClient'

type PropsCache = {
  assessment: Assessment
  cycle: Cycle
  countryISOs: Array<CountryIso>
}

export const removeCountriesData = async (props: PropsCache): Promise<void> => {
  const { assessment, countryISOs, cycle } = props

  const redis = RedisDataClient.getInstance()

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const key = getKeyCountry({ assessment, cycle, countryIso, key: Keys.Data.data })
      await redis.del(key)
    })
  )
}
