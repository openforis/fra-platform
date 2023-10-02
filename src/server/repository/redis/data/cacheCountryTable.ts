import { CountryIso } from 'meta/area'
import { Assessment, Cycle, TableName, TableNames } from 'meta/assessment'

import { DataRepository } from 'server/repository/assessmentCycle/data'
import { getKeyCountry, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type PropsCache = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  tableName: TableName
  force?: boolean
}

export const cacheCountryTable = async (props: PropsCache): Promise<void> => {
  const { assessment, cycle, countryIso, tableName, force } = props

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, cycle, countryIso, key: Keys.Data.data })

  const exist = await redis.hexists(key, tableName)
  if (!exist || force) {
    const propsData = { assessment, cycle, countryISOs: [countryIso], tables: { [tableName]: {} } }
    const data =
      tableName === TableNames.originalDataPointValue
        ? await DataRepository.getOriginalDataPointData(propsData)
        : await DataRepository.getTableData(propsData)

    const dataStr = JSON.stringify(data?.[countryIso]?.[tableName] ?? {})
    await redis.hset(key, tableName, dataStr)
  }
}
