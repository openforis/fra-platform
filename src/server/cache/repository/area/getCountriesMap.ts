import { Objects } from 'utils/objects'

import { Country, CountryIso } from 'meta/area'

import { BaseProtocol, DB } from 'server/db/db'
import { _cacheCountries } from 'server/cache/repository/area/cacheCountries'
import { Props } from 'server/cache/repository/area/props'
import { getKeyCycle, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

export const getCountriesMap = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Record<CountryIso, Country>> => {
  const { assessment, cycle, force = false } = props

  const redis = RedisData.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Area.country })

  const cachedData = await redis.hgetall(key)
  const cachedKeys = Object.keys(cachedData)

  if (Objects.isEmpty(cachedKeys) || force) {
    return _cacheCountries({ assessment, cycle }, client)
  }

  return Object.entries(cachedData).reduce((acc, [countryIso, country]: [CountryIso, string]) => {
    acc[countryIso] = JSON.parse(country)
    return acc
  }, {} as Record<CountryIso, Country>)
}
