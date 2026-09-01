import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Objects } from 'utils/objects'

import { _cacheCountries } from 'server/cache/repository/area/cacheCountries'
import { Props } from 'server/cache/repository/area/props'
import { getKeyCycle, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { BaseProtocol, DB } from 'server/db/db'

export const getCountriesMap = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Record<CountryIso, Country>> => {
  const { assessment, countryISOs = [], cycle, force = false } = props

  const redis = RedisData.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Area.country })

  const cachedData = await (Objects.isEmpty(countryISOs) ? redis.hgetall(key) : redis.hmget(key, ...countryISOs))

  const cachedRecord: Record<string, string> = {}
  if (Array.isArray(cachedData)) {
    countryISOs.forEach((countryIso, index) => {
      cachedRecord[countryIso] = cachedData[index]
    })
  } else {
    Object.assign(cachedRecord, cachedData)
  }

  const cacheMiss = Objects.isEmpty(cachedRecord) || Object.values(cachedRecord).some(Objects.isEmpty)

  if (cacheMiss || force) {
    return _cacheCountries({ assessment, cycle }, client)
  }

  return Object.entries(cachedRecord).reduce(
    (acc, [countryIso, country]: [CountryIso, string]) => {
      acc[countryIso] = JSON.parse(country)
      return acc
    },
    {} as Record<CountryIso, Country>
  )
}
