import { Objects } from 'utils/objects'

import { CountrySummary } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { CountrySummaryRepository } from 'server/repository/assessmentCycle/countrySummary'
import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
  force?: boolean
}

export const getManyCountrySummaries = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Array<CountrySummary>> => {
  const { assessment, cycle, force = false } = props

  const redis = RedisData.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Area.countrySummary })

  const cachedData = await redis.hgetall(key)
  const cachedKeys = Object.keys(cachedData)
  let summaries: Array<CountrySummary>

  if (Objects.isEmpty(cachedKeys) || force) {
    summaries = await CountrySummaryRepository.getMany({ assessment, cycle }, client)
    await redis.hmset(key, ...summaries.flatMap((cs) => [cs.countryIso, JSON.stringify(cs)]))
  } else {
    summaries = Object.values(cachedData).map((data) => JSON.parse(data))
  }

  return summaries
}
