import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.forestCharacteristics
const colName = '1990'
const cell = { colName, tableName, variableName: 'totalForestArea' }

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})
const forestArea = (raw: string): NodeUpdate => ({
  colName,
  tableName: TableNames.extentOfForest,
  value: { raw },
  variableName: 'forestArea',
})

const invalid = {
  messages: [{ key: 'generalValidation.forestAreaDoesNotMatchExtentOfForest', name: ValidatorName.totalForest }],
  valid: false,
}

export const totalForestArea: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.totalForest}: empty data is valid`,
  },
  // Empty extent of forest skips the validation
  {
    cell,
    data: [datum('totalForestArea', '22409')],
    expected: undefined,
    name: `${ValidatorName.totalForest}: empty extent of forest is valid`,
  },
  // Empty forest characteristics skips the validation
  {
    cell,
    data: [forestArea('22409')],
    expected: undefined,
    name: `${ValidatorName.totalForest}: empty forest characteristics is valid`,
  },
  // Equal areas are valid
  {
    cell,
    data: [forestArea('22409'), datum('totalForestArea', '22409')],
    expected: undefined,
    name: `${ValidatorName.totalForest}: equal areas are valid`,
  },
  // Areas within one unit of each other are valid
  {
    cell,
    data: [forestArea('22409'), datum('totalForestArea', '22409.5')],
    expected: undefined,
    name: `${ValidatorName.totalForest}: difference below one is valid`,
  },
  // A difference of one unit or more does not match the extent of forest
  {
    cell,
    data: [forestArea('22409'), datum('totalForestArea', '22410')],
    expected: invalid,
    name: `${ValidatorName.totalForest}: difference of one is invalid`,
  },
]
