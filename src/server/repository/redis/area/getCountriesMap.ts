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
    const [countries, countryLastPublished] = await Promise.all([
      CountryRepository.getMany({ assessment, cycle }, client),
      CountryRepository.getCountryLastPublished({ assessment }, client),
    ])

    const countriesMap = countries.reduce((acc, country) => {
      const lastPublishedData = countryLastPublished?.[country.countryIso]
      const countryWithLastPublished = {
        ...country,
        ...lastPublishedData,
      }

      acc[country.countryIso] = countryWithLastPublished
      return acc
    }, {} as Record<CountryIso, Country>)

    await redis.hmset(
      key,
      ...Object.entries(countriesMap).flatMap(([countryIso, country]) => [countryIso, JSON.stringify(country)])
    )

    return countriesMap
  }

  return Object.entries(cachedData).reduce((acc, [countryIso, country]: [CountryIso, string]) => {
    acc[countryIso] = JSON.parse(country)
    return acc
  }, {} as Record<CountryIso, Country>)
}
