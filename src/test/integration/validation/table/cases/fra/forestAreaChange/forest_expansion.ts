import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = TableNames.forestAreaChange
const colName = '1990-2000'
const cell = { colName, tableName, variableName: 'forest_expansion' }

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const invalid = {
  messages: [{ key: 'generalValidation.valueMustBePositive', name: ValidatorName.greaterThanOrZero }],
  valid: false,
}

export const forestExpansion: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: empty data is valid`,
  },
  // An explicitly empty value also skips the validation
  {
    cell,
    data: [datum('forest_expansion', '')],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: empty value is valid`,
  },
  {
    cell,
    data: [datum('forest_expansion', '100')],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: positive value is valid`,
  },
  // Zero is included in the valid range
  {
    cell,
    data: [datum('forest_expansion', '0')],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: zero is valid`,
  },
  {
    cell,
    data: [datum('forest_expansion', '-100')],
    expected: invalid,
    name: `${ValidatorName.greaterThanOrZero}: negative value is invalid`,
  },
  // Negative decimals must not be rounded to zero
  {
    cell,
    data: [datum('forest_expansion', '-0.1')],
    expected: invalid,
    name: `${ValidatorName.greaterThanOrZero}: negative decimal is invalid`,
  },
]
