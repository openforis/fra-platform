import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'
import { Objects } from 'utils/objects'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  tableNames: Array<TableName>
  tableValidations: RecordTableValidationsState
}

export const setValidations = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, tableNames, tableValidations } = props

  if (Objects.isEmpty(tableNames)) {
    return
  }

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Validation.tables })

  const validationsToSet = tableNames.reduce<Record<string, string>>((acc, tableName) => {
    acc[tableName] = JSON.stringify(tableValidations[tableName] ?? {})
    return acc
  }, {})

  await redis.hmset(key, validationsToSet)
}
