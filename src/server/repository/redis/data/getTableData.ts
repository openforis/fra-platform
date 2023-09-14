import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, TableName } from 'meta/assessment'
import { RecordColumnData, RecordCountryData } from 'meta/data'

import { getKeyCountry, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

import { _cacheTableData } from './_cacheTableData'

export type TableCondition = { variables?: Array<string>; columns?: Array<string> }
export type TablesCondition = Record<TableName, TableCondition>

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryISOs: Array<CountryIso>
  tables: TablesCondition
}

export const getTableData = async (props: Props): Promise<RecordCountryData> => {
  const { assessment, cycle, countryISOs, tables } = props

  const redis = RedisData.getInstance()
  const data: RecordCountryData = {}

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const key = getKeyCountry({ assessment, cycle, countryIso, key: Keys.Data.data })

      await Promise.all(
        Object.entries(tables).map(async ([tableName, tableCondition]) => {
          await _cacheTableData({ assessment, cycle, countryIso, tableCondition, tableName })

          const tableData: RecordColumnData = JSON.parse(await redis.hget(key, tableName))

          Objects.setInPath({ obj: data, path: [countryIso, tableName], value: tableData })
        })
      )
    })
  )

  return data
}
