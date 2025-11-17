import { Country, LastPublishedInfo } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { getKeyCycle, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { BaseProtocol } from 'server/db/db'
import { CountryRepository } from 'server/db/repository/assessmentCycle/country'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso?: CountryIso
  force?: boolean
}

const _mergeCountry = (country: Country, lastPublishedInfo: Record<CountryIso, LastPublishedInfo>): Country => ({
  ...country,
  lastPublishedInfo: lastPublishedInfo?.[country.countryIso],
})

const _setCache = async (key: string, countries: Array<Country>): Promise<void> => {
  const redis = RedisData.getInstance()
  await redis.hmset(key, ...countries.flatMap((c) => [c.countryIso, JSON.stringify(c)]))
}

const _getCountries = async (
  props: { assessment: Assessment; cycle: Cycle; countryIso?: CountryIso },
  client: BaseProtocol
): Promise<Array<Country>> => {
  const { assessment, countryIso, cycle } = props

  const lastPublishedInfo = await CountryRepository.getCountryLastPublishedInfo(
    { assessment, countryIso, cycle },
    client
  )

  if (countryIso) {
    const country = await CountryRepository.getOne({ assessment, cycle, countryIso }, client)
    return [_mergeCountry(country, lastPublishedInfo)]
  }

  const countries = await CountryRepository.getMany({ assessment, cycle }, client)
  return countries.map((country) => _mergeCountry(country, lastPublishedInfo))
}

export const _cacheCountries = async (props: Props, client: BaseProtocol): Promise<Record<CountryIso, Country>> => {
  const { assessment, countryIso, cycle } = props
  const key = getKeyCycle({ assessment, cycle, key: Keys.Area.country })

  const countries = await _getCountries({ assessment, cycle, countryIso }, client)
  await _setCache(key, countries)

  return countries.reduce<Record<CountryIso, Country>>((acc, country) => {
    acc[country.countryIso] = country
    return acc
  }, {} as Record<CountryIso, Country>)
}
