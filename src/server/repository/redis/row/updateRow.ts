import { Assessment, RowCache, RowCaches } from 'meta/assessment'

import { getKeyRow } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  tableName: string
  variableName: string
  rowCache: RowCache
}

export const updateRow = async (props: Props): Promise<void> => {
  const { assessment, variableName, tableName, rowCache } = props
  const redis = RedisData.getInstance()
  const key = getKeyRow({ assessment })
  const rowKey = RowCaches.getKey({
    tableName,
    variableName,
  })

  await redis.hset(key, rowKey, JSON.stringify(rowCache))
}
