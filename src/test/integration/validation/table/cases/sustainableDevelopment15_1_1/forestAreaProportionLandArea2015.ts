import { TableNames } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.sustainableDevelopment15_1_1
const colName = '2000'
const variableName = 'forestAreaProportionLandArea2015'
const cell = { colName, tableName, variableName }

const datum = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })

// The metadata passes the maximum as the string '100'
const over100 = {
  messages: [
    { key: 'generalValidation.valueNotGreaterThan', name: ValidatorName.notGreaterThan, params: { maxValue: '100' } },
  ],
  valid: false,
}

export const forestAreaProportionLandArea2015: Array<TableValidationTestCase> = [
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
    name: `${ValidatorName.notGreaterThan}: below 100 is valid`,
  },
  // There is no tolerance over the maximum
  {
    cell,
    data: [datum('100')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThan}: 100 is valid`,
  },
  {
    cell,
    data: [datum('100.1')],
    expected: over100,
    name: `${ValidatorName.notGreaterThan}: over 100 is invalid`,
  },
]
