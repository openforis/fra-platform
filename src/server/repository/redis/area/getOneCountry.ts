import { Objects } from 'utils/objects'

import { Areas, Country, CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

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
    country = await CountryRepository.getOne({ assessment, cycle, countryIso }, client)
    const countryLastPublished = await CountryRepository.getCountryLastPublished({ assessment, countryIso }, client)

    country = Objects.setInPath({
      obj: country,
      path: ['lastPublished'],
      value: countryLastPublished?.[countryIso]?.lastPublished,
    })

    await redis.hmset(key, [countryIso, JSON.stringify(country)])
  } else {
    country = JSON.parse(cachedData)
  }

  return country
}
