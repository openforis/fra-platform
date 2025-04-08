import { Country, CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

interface Props {
  assessment: Assessment
  cycle: Cycle
}

export const getCountriesMap = async (props: Props): Promise<Record<CountryIso, Country>> => {
  const { assessment, cycle } = props

  const redis = RedisData.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Area.country })

  const cachedData = await redis.hgetall(key)

  return Object.entries(cachedData).reduce((acc, [countryIso, country]: [CountryIso, string]) => {
    acc[countryIso] = JSON.parse(country)
    return acc
  }, {} as Record<CountryIso, Country>)
}
