import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Objects } from 'utils/objects'

import { _cacheCountries } from 'server/cache/repository/area/cacheCountries'
import { Props } from 'server/cache/repository/area/props'
import { getKeyCycle, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { BaseProtocol, DB } from 'server/db/db'

type GetCountriesMapProps = Props & {
  countryISOs?: Array<CountryIso>
}

const _getAllCountries = async (props: Props, client: BaseProtocol): Promise<Record<CountryIso, Country>> => {
  const { assessment, cycle, force = false } = props

  if (force) {
    return _cacheCountries({ assessment, cycle }, client)
  }

  const redis = RedisData.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Area.country })

  const cachedData = await redis.hgetall(key)
  const cachedKeys = Object.keys(cachedData)

  if (Objects.isEmpty(cachedKeys)) {
    return _cacheCountries({ assessment, cycle }, client)
  }

  return Object.entries(cachedData).reduce(
    (acc, [countryIso, country]: [CountryIso, string]) => {
      acc[countryIso] = JSON.parse(country)
      return acc
    },
    {} as Record<CountryIso, Country>
  )
}

const _getCountriesByISOs = async (
  props: Props & { countryISOs: Array<CountryIso> },
  client: BaseProtocol
): Promise<Record<CountryIso, Country>> => {
  const { assessment, countryISOs, cycle, force = false } = props

  const record = {} as Record<CountryIso, Country>
  if (countryISOs.length === 0) {
    return record
  }

  if (!force) {
    const redis = RedisData.getInstance()
    const key = getKeyCycle({ assessment, cycle, key: Keys.Area.country })

    const cached = await redis.hmget(key, ...countryISOs)
    const allCached = cached.every((cachedCountry) => !Objects.isEmpty(cachedCountry))

    if (allCached) {
      countryISOs.forEach((countryIso, index) => {
        record[countryIso] = JSON.parse(cached[index])
      })
      return record
    }
  }

  const countries = await _cacheCountries({ assessment, cycle }, client)
  countryISOs.forEach((countryIso) => {
    record[countryIso] = countries[countryIso]
  })

  return record
}

export const getCountriesMap = async (
  props: GetCountriesMapProps,
  client: BaseProtocol = DB
): Promise<Record<CountryIso, Country>> => {
  const { countryISOs, ...propsGet } = props

  if (Objects.isNil(countryISOs)) {
    return _getAllCountries(propsGet, client)
  }

  return _getCountriesByISOs({ ...propsGet, countryISOs }, client)
}
