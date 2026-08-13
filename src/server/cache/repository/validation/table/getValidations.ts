import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { RecordTableValidationsState, TableValidations } from 'meta/assessment/validation/table'
import { Objects } from 'utils/objects'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  tableNames?: Array<TableName>
}

const _parseTableValidations = (value?: string | null): TableValidations => {
  if (!value) {
    return {}
  }

  return JSON.parse(value)
}

export const getValidations = async (props: Props): Promise<RecordTableValidationsState> => {
  const { assessment, countryIso, cycle, tableNames } = props

  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Data.validationTables })

  if (!Objects.isNil(tableNames)) {
    if (tableNames.length === 0) {
      return {}
    }

    const redis = RedisData.getInstance()
    const values = await redis.hmget(key, ...tableNames)

    return tableNames.reduce<RecordTableValidationsState>((acc, tableName, index) => {
      acc[tableName] = _parseTableValidations(values[index])
      return acc
    }, {})
  }

  const redis = RedisData.getInstance()
  const tableValidations = await redis.hgetall(key)

  return Object.entries(tableValidations).reduce<RecordTableValidationsState>((acc, [tableName, validations]) => {
    acc[tableName as TableName] = _parseTableValidations(validations)
    return acc
  }, {})
}
