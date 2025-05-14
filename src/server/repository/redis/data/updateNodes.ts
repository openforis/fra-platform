import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data'

import { getKeyCountry, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  nodes: Record<TableName, Array<NodeUpdate>>
}

export const updateNodes = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, nodes } = props

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, cycle, countryIso, key: Keys.Data.data })

  const tableNames = Object.keys(nodes)
  const data = await redis.hmget(key, ...tableNames)

  const dataUpdate = tableNames.reduce<Record<string, string>>((acc, tableName, index) => {
    const tableData = JSON.parse(data[index])

    nodes[tableName].forEach((node) => {
      const { colName, value, variableName } = node
      const path = [colName, variableName]
      Objects.setInPath({ obj: tableData, path, value })
    })

    return { ...acc, [tableName]: JSON.stringify(tableData) }
  }, {})

  await redis.hmset(key, dataUpdate)
}
