import { TableNames } from 'meta/assessment/table'
import { Years } from 'meta/assessment/years'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { cycle } from '../setup/assessment'
import { TableValidationTestCase } from '../types'

const tableName = TableNames.forestAreaChange
const [colName] = Years.intervals(cycle)
const cell = { colName, tableName, variableName: 'deforestation' }

// Formula copied from the fra 2025 metadata row forestAreaChange.deforestation
const rows: TableValidationTestCase['rows'] = [
  {
    cols: [{ colName }],
    tableName,
    validateFns: ['validatorGreaterThanOrZero(forestAreaChange.deforestation)'],
    variableName: 'deforestation',
  },
]

const deforestation = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })

const invalid = {
  messages: [{ key: 'generalValidation.valueMustBePositive', name: ValidatorName.greaterThanOrZero }],
  valid: false,
}

export const validatorGreaterThanOrZero: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: empty data is valid`,
    rows,
  },
  // An empty value skips the validation
  {
    cell,
    data: [deforestation('')],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: empty value is valid`,
    rows,
  },
  // Positive values are valid
  {
    cell,
    data: [deforestation('100')],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: positive value is valid`,
    rows,
  },
  // Zero is included in the valid range
  {
    cell,
    data: [deforestation('0')],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: zero is valid`,
    rows,
  },
  // Negative values are invalid
  {
    cell,
    data: [deforestation('-100')],
    expected: invalid,
    name: `${ValidatorName.greaterThanOrZero}: negative value is invalid`,
    rows,
  },
  // Negative decimals must not be rounded to zero
  {
    cell,
    data: [deforestation('-0.1')],
    expected: invalid,
    name: `${ValidatorName.greaterThanOrZero}: negative decimal is invalid`,
    rows,
  },
]
