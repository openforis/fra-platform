import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  nodes: Record<TableName, Array<NodeUpdate>>
}

export const removeNodes = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, nodes } = props

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, cycle, countryIso, key: Keys.Data.data })

  const tableNames = Object.keys(nodes)
  const data = await redis.hmget(key, ...tableNames)

  const dataUpdate = tableNames.reduce<Record<string, string>>((acc, tableName, index) => {
    const tableData = JSON.parse(data[index])

    nodes[tableName].forEach((node) => {
      const { colName, variableName } = node
      const path = [colName, variableName]
      Objects.unset(tableData, path)
    })

    return { ...acc, [tableName]: JSON.stringify(tableData) }
  }, {})

  await redis.hmset(key, dataUpdate)
}
