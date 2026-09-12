import { TableNames } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = TableNames.degradedForestMonitoring2025
const variableName = 'yearOfLatestAssessment'
const cell = { colName: variableName, tableName, variableName }

const datum = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })

const notAYear = { key: 'generalValidation.valueMustBeYear', name: ValidatorName.isYear }
// The metadata passes the maximum as the string '2024'
const after2024 = {
  key: 'generalValidation.valueNotGreaterThan',
  name: ValidatorName.notGreaterThan,
  params: { maxValue: '2024' },
}

export const yearOfLatestAssessment: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.isYear}: empty data is valid`,
  },
  {
    cell,
    data: [datum('2024')],
    expected: undefined,
    name: `${ValidatorName.isYear}: four digit year is valid`,
  },
  // Invalid year
  {
    cell,
    data: [datum('24')],
    expected: { messages: [notAYear], valid: false },
    name: `${ValidatorName.isYear}: two digit year is invalid`,
  },
  // The column is free text
  {
    cell,
    data: [datum('unknown')],
    expected: { messages: [notAYear], valid: false },
    name: `${ValidatorName.isYear}: text is invalid`,
  },
  {
    cell,
    data: [datum('2025')],
    expected: { messages: [after2024], valid: false },
    name: `${ValidatorName.notGreaterThan}: year after 2024 is invalid`,
  },
  // Both formulas fail and messages are merged
  {
    cell,
    data: [datum('3024')],
    expected: { messages: [notAYear, after2024], valid: false },
    name: `${ValidatorName.notGreaterThan}: year after 2024 that is not a year fails both`,
  },
]
