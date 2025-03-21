import { Objects } from 'utils/objects'

import { Areas, Country, CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  force?: boolean
}

const _validateCountryIso = (countryIso: CountryIso) => {
  if (!Areas.isISOCountry(countryIso)) {
    throw new Error(`Error: Expected a valid area: country iso\nInstead received: \x1b[43m"${countryIso}"\x1b[0m`)
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
    country = await CountryRepository.getOne({ assessment, cycle, countryIso }, client)
    await redis.hmset(key, [countryIso, JSON.stringify(country)])
  } else {
    country = JSON.parse(cachedData)
  }

  return country
}
