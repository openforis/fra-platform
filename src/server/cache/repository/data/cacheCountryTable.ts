import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableName, TableNames } from 'meta/assessment/table'

import { BaseProtocol, DB } from 'server/db'
import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { DataRepository } from 'server/repository/assessmentCycle/data'

type PropsCache = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  tableName: TableName
  force?: boolean
}

export const cacheCountryTable = async (props: PropsCache, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, countryIso, cycle, force, tableName } = props

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, cycle, countryIso, key: Keys.Data.data })

  if (force || !(await redis.hexists(key, tableName))) {
    const propsData = { assessment, cycle, countryISOs: [countryIso], tables: { [tableName]: {} } }
    const data =
      tableName === TableNames.originalDataPointValue
        ? await DataRepository.getOriginalDataPointData(propsData, client)
        : await DataRepository.getTableData(propsData, client)

    const dataStr = JSON.stringify(data?.[countryIso]?.[tableName] ?? {})
    await redis.hset(key, tableName, dataStr)
  }
}
