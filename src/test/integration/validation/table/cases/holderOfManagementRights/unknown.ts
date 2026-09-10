import { TableNames } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.holderOfManagementRights
const colName = '1990'
const variableName = 'unknown'
const cell = { colName, tableName, variableName }

const datum = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })

const invalid = {
  messages: [{ key: 'generalValidation.valueMustBePositive', name: ValidatorName.greaterThanOrZero }],
  valid: false,
}

export const unknown: Array<TableValidationTestCase> = [
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
    data: [datum('')],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: empty value is valid`,
  },
  {
    cell,
    data: [datum('100')],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: positive value is valid`,
  },
  // Zero is included in the valid range
  {
    cell,
    data: [datum('0')],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: zero is valid`,
  },
  {
    cell,
    data: [datum('-100')],
    expected: invalid,
    name: `${ValidatorName.greaterThanOrZero}: negative value is invalid`,
  },
  // Negative decimals must not be rounded to zero
  {
    cell,
    data: [datum('-0.1')],
    expected: invalid,
    name: `${ValidatorName.greaterThanOrZero}: negative decimal is invalid`,
  },
]
