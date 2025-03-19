import { Objects } from 'utils/objects'

import { RegionGroup } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { RegionRepository } from 'server/repository/assessmentCycle/region'
import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
  force?: boolean
}

export const getManyRegionGroups = async (props: Props, client: BaseProtocol = DB): Promise<Array<RegionGroup>> => {
  const { assessment, cycle, force = false } = props

  const redis = RedisData.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Area.regionGroups })

  const cachedData = await redis.hgetall(key)
  const cachedKeys = Object.keys(cachedData)
  let groups: Array<RegionGroup>

  if (Objects.isEmpty(cachedKeys) || force) {
    groups = await RegionRepository.getRegionGroups({ assessment, cycle }, client)
    await redis.hmset(key, ...Object.entries(groups).flatMap(([id, rg]) => [id, JSON.stringify(rg)]))
  } else {
    groups = Object.values(cachedData).map((data) => JSON.parse(data))
  }

  return groups
}
