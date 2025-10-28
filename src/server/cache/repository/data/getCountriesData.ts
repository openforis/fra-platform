import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordColumnData, RecordCountryData, TablesCondition } from 'meta/data'

import { cacheCountryTable } from 'server/cache/repository/data/cacheCountryTable'
import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryISOs: Array<CountryIso>
  tables: TablesCondition
  force?: boolean
}

export const getCountriesData = async (props: Props, client: BaseProtocol = DB): Promise<RecordCountryData> => {
  const { assessment, countryISOs, cycle, force, tables } = props

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
