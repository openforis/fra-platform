import { Objects } from 'utils/objects'

import { Areas, Country, CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db'
import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

import { _cacheCountries } from './cacheCountries'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  force?: boolean
}

const _validateCountryIso = (countryIso: CountryIso) => {
  if (!Areas.isISOCountry(countryIso)) {
    throw new Error(`Error: Expected a valid area: country iso\nInstead received: "${countryIso}"`)
  }
}

export const getOneCountry = async (props: Props, client: BaseProtocol = DB): Promise<Country> => {
  const { assessment, cycle, countryIso, force = false } = props

  _validateCountryIso(countryIso)

  const redis = RedisData.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Area.country })

  const cachedData = await redis.hget(key, countryIso)
  let country: Country

  if (Objects.isEmpty(cachedData) || force) {
    const countries = await _cacheCountries({ assessment, cycle, countryIso }, client)
    country = countries[countryIso]
  } else {
    country = JSON.parse(cachedData)
  }

  return country
}
