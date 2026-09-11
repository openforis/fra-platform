import { TableNames } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.sustainableDevelopment15_2_1_3
const colName = '2000'
const variableName = 'proportionForestAreaLegallyEstablishedProtectedAreas'
const cell = { colName, tableName, variableName }

const datum = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })

// The metadata sets the maximum to 101 instead of 100, and passes it as a string
const over101 = {
  messages: [
    { key: 'generalValidation.valueNotGreaterThan', name: ValidatorName.notGreaterThan, params: { maxValue: '101' } },
  ],
  valid: false,
}

export const proportionForestAreaLegallyEstablishedProtectedAreas: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.notGreaterThan}: empty data is valid`,
  },
  // An explicitly empty value also skips the validation
  {
    cell,
    data: [datum('')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThan}: empty value is valid`,
  },
  {
    cell,
    data: [datum('50')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThan}: below 101 is valid`,
  },
  // There is no tolerance over the maximum
  {
    cell,
    data: [datum('101')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThan}: 101 is valid`,
  },
  {
    cell,
    data: [datum('101.1')],
    expected: over101,
    name: `${ValidatorName.notGreaterThan}: over 101 is invalid`,
  },
]
