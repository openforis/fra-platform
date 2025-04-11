import { Objects } from 'utils/objects'

import { Country, CountryIso } from 'meta/area'

import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

import { Props } from './props'

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
    const countries = await CountryRepository.getMany({ assessment, cycle }, client)
    await redis.hmset(key, ...countries.flatMap((c) => [c.countryIso, JSON.stringify(c)]))
    return countries.reduce((acc, country) => {
      acc[country.countryIso] = country
      return acc
    }, {} as Record<CountryIso, Country>)
  }

  return Object.entries(cachedData).reduce((acc, [countryIso, country]: [CountryIso, string]) => {
    acc[countryIso] = JSON.parse(country)
    return acc
  }, {} as Record<CountryIso, Country>)
}
