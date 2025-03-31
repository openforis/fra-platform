import { Objects } from 'utils/objects'

import { Country } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
  force?: boolean
}

export const getManyCountries = async (props: Props, client: BaseProtocol = DB): Promise<Array<Country>> => {
  const { assessment, cycle, force = false } = props

  const redis = RedisData.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Area.country })

  const cachedData = await redis.hgetall(key)
  const cachedKeys = Object.keys(cachedData)
  let countries: Array<Country>

  if (Objects.isEmpty(cachedKeys) || force) {
    countries = await CountryRepository.getMany({ assessment, cycle }, client)
    await redis.hmset(key, ...countries.flatMap((c) => [c.countryIso, JSON.stringify(c)]))
  } else {
    countries = Object.values(cachedData).map((data) => JSON.parse(data))
  }

  return countries
}
