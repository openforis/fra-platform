import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const removeAreas = async (props: Props): Promise<void> => {
  const { assessment, cycle } = props

  const redis = RedisData.getInstance()

  const keyCountry = getKeyCycle({ assessment, cycle, key: Keys.Area.country })
  const keyRegionGroups = getKeyCycle({ assessment, cycle, key: Keys.Area.regionGroups })
  await redis.del(keyCountry, keyRegionGroups)
}
