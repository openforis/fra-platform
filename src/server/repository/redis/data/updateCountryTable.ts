import { CountryIso } from 'meta/area'
import { Assessment, Cycle, TableName } from 'meta/assessment'
import { RecordCountryData } from 'meta/data'

import { getKeyCountry, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  tableName: TableName
  data: RecordCountryData
}

export const updateCountryTable = (props: Props): Promise<number> => {
  const { assessment, cycle, countryIso, tableName, data } = props

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, cycle, countryIso, key: Keys.Data.data })

  const dataStr = JSON.stringify(data?.[countryIso]?.[tableName] ?? {})
  return redis.hset(key, tableName, dataStr)
}
