import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { AssessmentMetaCache } from 'meta/assessment/metaCache'

import { getKeyMetaCache } from 'server/cache/repository/keys'
import { getMetaCacheEntryKey } from 'server/cache/repository/metaCache/generateMetaCache/_getMetaCacheEntryKey'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getMetaCache = async (props: Props): Promise<AssessmentMetaCache> => {
  const { assessment, cycle } = props

  const redis = RedisData.getInstance()
  const key = getKeyMetaCache()
  const keyEntry = getMetaCacheEntryKey({ assessment, cycle })

  const metaCacheRedis = await redis.hget(key, keyEntry)

  if (Objects.isEmpty(metaCacheRedis)) {
    throw new Error(`Redis metaCache not found for ${getMetaCacheEntryKey({ assessment, cycle })}`)
  }

  return JSON.parse(metaCacheRedis)
}
