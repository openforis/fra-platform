import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { Cycle } from 'meta/assessment/cycle'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { Objects } from 'utils/objects'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

import { getTableValidations } from './getTableValidations'

type Props = {
  assessment: Assessment
  colName: ColName
  countryIso: CountryIso
  cycle: Cycle
  tableName: TableName
  validation: NodeValueValidation
  variableName: VariableName
}

export const setValidation = async (props: Props): Promise<void> => {
  const { assessment, colName, countryIso, cycle, tableName, validation, variableName } = props
  const currentValidations = await getTableValidations({ assessment, countryIso, cycle, tableNames: [tableName] })
  const tableValidation = Objects.cloneDeep(currentValidations[tableName] ?? {})
  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Data.validations })

  Objects.setInPath({ obj: tableValidation, path: [colName, variableName], value: validation })

  await redis.hset(key, tableName, JSON.stringify(tableValidation))
}
