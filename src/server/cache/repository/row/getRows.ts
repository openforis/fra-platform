import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { RecordRowCache, RowCacheKey } from 'meta/assessment/rowCache'
import { RowCaches } from 'meta/assessment/rowCaches'

import { BaseProtocol, DB } from 'server/db'
import { getKeyRow } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { RowRepository } from 'server/repository/assessment/row'

type Props = {
  assessment: Assessment
  rowKeys?: Array<RowCacheKey>
  force?: boolean
}

const _cacheRows = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, force, rowKeys } = props

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

    if (!Objects.isEmpty(recordRows)) {
      await redis.hmset(key, recordRows)
    }
  }
}

export const getRows = async (props: Props, client: BaseProtocol = DB): Promise<RecordRowCache> => {
  const { assessment, force, rowKeys } = props

  await _cacheRows({ assessment, rowKeys, force }, client)

  const redis = RedisData.getInstance()

  const key = getKeyRow({ assessment })
  const keys = rowKeys?.length ? rowKeys : await redis.hkeys(key)
  const values = Objects.isEmpty(keys) ? [] : await redis.hmget(key, ...keys)

  return keys.reduce<RecordRowCache>(
    (acc, key, index) => ({
      ...acc,
      [key]: JSON.parse(values[index]),
    }),
    {}
  )
}
