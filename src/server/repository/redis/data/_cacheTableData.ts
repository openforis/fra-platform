import { CountryIso } from 'meta/area'
import { Assessment, Cycle, TableName, TableNames } from 'meta/assessment'

import { DataRepository } from 'server/repository/assessmentCycle/data'
import { TableCondition } from 'server/repository/redis/data/getTableData'
import { getKeyCountry, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type PropsCache = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  tableCondition: TableCondition
  tableName: TableName
}

export const _cacheTableData = async (props: PropsCache) => {
  const { assessment, cycle, countryIso, tableCondition, tableName } = props

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, cycle, countryIso, key: Keys.Data.data })

  const exist = await redis.hexists(key, tableName)
  if (!exist) {
    const propsData = { assessment, cycle, countryISOs: [countryIso], tables: { [tableName]: tableCondition } }
    const recordCountryData =
      tableName === TableNames.originalDataPointValue
        ? await DataRepository.getOriginalDataPointData(propsData)
        : await DataRepository.getTableData(propsData)
    const dataStr = JSON.stringify(recordCountryData?.[countryIso]?.[tableName] ?? {})
    await redis.hset(key, new Map([[tableName, dataStr]]))
  }
}
