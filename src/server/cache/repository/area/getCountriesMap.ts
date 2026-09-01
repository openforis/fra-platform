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

  const cachedCountries = Array.isArray(cachedData) ? cachedData : Object.values(cachedData)

  const hasMissingCountries = !Objects.isEmpty(countryISOs) && cachedCountries.includes(null)

  if (Objects.isEmpty(cachedCountries) || hasMissingCountries || force) {
    return _cacheCountries({ assessment, cycle }, client)
  }

  return cachedCountries.reduce(
    (acc, countryString) => {
      const country: Country = JSON.parse(countryString)
      acc[country.countryIso] = country
      return acc
    },
    {} as Record<CountryIso, Country>
  )
}
