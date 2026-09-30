import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { getKeyMetaCache } from 'server/cache/repository/keys'
import { getMetaCacheEntryKey } from 'server/cache/repository/metaCache/generateMetaCache/_getMetaCacheEntryKey'
import { RedisDataClient } from 'server/service/redis/dataClient'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const removeMetaCache = async (props: Props): Promise<void> => {
  const { assessment, cycle } = props

  const redis = RedisDataClient.getInstance()
  const key = getKeyMetaCache()
  const keyEntry = getMetaCacheEntryKey({ assessment, cycle })

  await redis.hdel(key, keyEntry)
}
