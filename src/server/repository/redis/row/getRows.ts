import { Assessment, RecordRowCache, RowCacheKey, RowCaches } from 'meta/assessment'

import { RowRepository } from 'server/repository/assessment/row'
import { getKeyRow } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  rowKeys?: Array<RowCacheKey>
}

const _cacheRows = async (props: Pick<Props, 'assessment'>): Promise<void> => {
  const { assessment } = props

  const redis = RedisData.getInstance()
  const key = getKeyRow(props)

  const length = await redis.hlen(key)
  if (length === 0) {
    const rows = await RowRepository.getManyCache({ assessment })

    const recordRows = rows.reduce<Record<string, string>>((acc, row) => {
      const rowKey = RowCaches.getKey({ tableName: row.tableName, variableName: row.props.variableName })
      return { ...acc, [rowKey]: JSON.stringify(row) }
    }, {})

    await redis.hmset(key, recordRows)
  }
}

export const getRows = async (props: Props): Promise<RecordRowCache> => {
  const { assessment, rowKeys } = props

  await _cacheRows({ assessment })

  const redis = RedisData.getInstance()

  const key = getKeyRow({ assessment })
  const keys = rowKeys ?? (await redis.hkeys(key))
  const values = await redis.hmget(key, ...keys)

  return keys.reduce<RecordRowCache>(
    (acc, key, index) => ({
      ...acc,
      [key]: JSON.parse(values[index]),
    }),
    {}
  )
}
