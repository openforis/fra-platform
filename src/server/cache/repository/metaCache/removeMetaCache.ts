import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { getKeyMetaCache } from 'server/cache/repository/keys'
import { getMetaCacheEntryKey } from 'server/cache/repository/metaCache/generateMetaCache/_getMetaCacheEntryKey'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const removeMetaCache = async (props: Props): Promise<void> => {
  const { assessment, cycle } = props

  const redis = RedisData.getInstance()
  const key = getKeyMetaCache()
  const keyEntry = getMetaCacheEntryKey({ assessment, cycle })

  await redis.hdel(key, keyEntry)
}
