import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RecordColumnData, RecordCountryData, TablesCondition } from 'meta/data'

import { BaseProtocol, DB } from 'server/db'
import { cacheCountryTable } from 'server/repository/redis/data/cacheCountryTable'
import { getKeyCountry, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryISOs: Array<CountryIso>
  tables: TablesCondition
  force?: boolean
}

export const getCountriesData = async (props: Props, client: BaseProtocol = DB): Promise<RecordCountryData> => {
  const { assessment, cycle, countryISOs, tables, force } = props

  const redis = RedisData.getInstance()
  const data: RecordCountryData = {}

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const key = getKeyCountry({ assessment, cycle, countryIso, key: Keys.Data.data })

      await Promise.all(
        Object.entries(tables).map(async ([tableName, tableCondition]) => {
          await cacheCountryTable({ assessment, cycle, countryIso, tableName, force }, client)

          let tableData: RecordColumnData = JSON.parse(await redis.hget(key, tableName))

          if (tableCondition.columns) {
            tableData = Objects.pick(tableData, tableCondition.columns)
          }
          if (tableCondition.variables) {
            Object.keys(tableData).forEach((column) => {
              Objects.setInPath({
                obj: tableData,
                path: [column],
                value: Objects.pick(tableData[column], tableCondition.variables),
              })
            })
          }

          Objects.setInPath({ obj: data, path: [countryIso, tableName], value: tableData })
        })
      )
    })
  )

  return data
}
