import { Assessment, RecordRowCache, RowCacheKey, RowCaches } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { RowRepository } from 'server/repository/assessment/row'
import { getKeyRow } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  rowKeys?: Array<RowCacheKey>
  force?: boolean
}

const _cacheRows = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, rowKeys, force } = props

  const redis = RedisData.getInstance()
  const key = getKeyRow(props)

  if (force) {
    await redis.del(key)
  }

  const length = await redis.hlen(key)

  if (length === 0) {
    const rows = await RowRepository.getManyCache({ assessment }, client)

    const recordRows = rows.reduce<Record<string, string>>((acc, row) => {
      const rowKey = RowCaches.getKey({ tableName: row.tableName, variableName: row.props.variableName })

      if (rowKeys && !rowKeys.includes(rowKey)) return acc

      return { ...acc, [rowKey]: JSON.stringify(row) }
    }, {})

    await redis.hmset(key, recordRows)
  }
}

export const getRows = async (props: Props, client: BaseProtocol = DB): Promise<RecordRowCache> => {
  const { assessment, rowKeys, force } = props

  await _cacheRows({ assessment, rowKeys, force }, client)

  const redis = RedisData.getInstance()

  const key = getKeyRow({ assessment })
  const keys = rowKeys?.length ? rowKeys : await redis.hkeys(key)
  const values = await redis.hmget(key, ...keys)

  return keys.reduce<RecordRowCache>(
    (acc, key, index) => ({
      ...acc,
      [key]: JSON.parse(values[index]),
    }),
    {}
  )
}
