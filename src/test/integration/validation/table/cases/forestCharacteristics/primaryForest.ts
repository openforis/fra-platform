import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.forestCharacteristics
const colName = '1990'
const variableName = 'primaryForest'
const cell = { colName, tableName, variableName }

const datum = (name: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName: name,
})

const exceedsNaturalForest = {
  messages: [{ key: 'generalValidation.subCategoryExceedsParent', name: ValidatorName.subCategory }],
  valid: false,
}
const negative = {
  messages: [{ key: 'generalValidation.valueMustBePositive', name: ValidatorName.greaterThanOrZero }],
  valid: false,
}

export const primaryForest: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.subCategory}: empty data is valid`,
  },
  // Empty natural forest area skips the validation
  {
    cell,
    data: [datum(variableName, '100')],
    expected: undefined,
    name: `${ValidatorName.subCategory}: empty natural forest area is valid`,
  },
  {
    cell,
    data: [datum('naturalForestArea', '1000')],
    expected: undefined,
    name: `${ValidatorName.subCategory}: empty primary forest is valid`,
  },
  {
    cell,
    data: [datum('naturalForestArea', '1000'), datum(variableName, '100')],
    expected: undefined,
    name: `${ValidatorName.subCategory}: within the natural forest area is valid`,
  },
  // The check allows one unit of tolerance
  {
    cell,
    data: [datum('naturalForestArea', '1000'), datum(variableName, '1001')],
    expected: undefined,
    name: `${ValidatorName.subCategory}: one unit over the natural forest area is valid`,
  },
  {
    cell,
    data: [datum('naturalForestArea', '1000'), datum(variableName, '1001.01')],
    expected: exceedsNaturalForest,
    name: `${ValidatorName.subCategory}: over the natural forest area is invalid`,
  },
  // A natural forest area of 0 counts as a value
  {
    cell,
    data: [datum('naturalForestArea', '0'), datum(variableName, '2')],
    expected: exceedsNaturalForest,
    name: `${ValidatorName.subCategory}: over a natural forest area of 0 is invalid`,
  },
  // Zero is included in the valid range
  {
    cell,
    data: [datum(variableName, '0')],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: zero is valid`,
  },
  {
    cell,
    data: [datum(variableName, '-100')],
    expected: negative,
    name: `${ValidatorName.greaterThanOrZero}: negative primary forest is invalid`,
  },
]
