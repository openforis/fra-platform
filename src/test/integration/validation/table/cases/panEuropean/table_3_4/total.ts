import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_3_4'
// The total service value uses this column name, but its type is decimal
const colName = 'name_of_service_product'
const variableName = 'total'
const cell = { colName, tableName, variableName }
const services: Array<VariableName> = [
  '_10th',
  '_09th',
  '_08th',
  '_07th',
  '_06th',
  '_05th',
  '_04th',
  '_03rd',
  '_02nd',
  '_01st',
]

const datum = (name: VariableName, raw: string, col = colName): NodeUpdate => ({
  colName: col,
  tableName,
  value: { raw },
  variableName: name,
})

const data = (raws: Array<string>): Array<NodeUpdate> => [
  ...services.map((name, index) => datum(name, raws[index], 'service_provision_value_1000_national_currency')),
  datum('remaining_total', raws[10]),
]

// The metadata passes no labels to the formula, so the message carries the validator defaults
const differentFromTotal = (valueRounded: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.valueEqualToSumParent',
      name: ValidatorName.equalToSum,
      params: {
        parentCol: { key: '' },
        parentTable: '',
        parentVariable: { key: 'parent' },
        subcategories: '',
        valueRounded,
      },
    },
  ],
  valid: false,
})

export const total: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid`,
  },
  // Empty total service value skips the validation
  {
    cell,
    data: data(['50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '500']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total service value is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: total service value without services is invalid`,
  },
  // Empty services don't count as 0, so not even a total service value of 0 matches them
  {
    cell,
    data: [datum(variableName, '0')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total service value of 0 without services is invalid`,
  },
  // Empty services are left out of the sum
  {
    cell,
    data: [datum(variableName, '1000'), datum('_01st', '1000', 'service_provision_value_1000_national_currency')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only the first service equal to the total service value is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), datum('remaining_total', '1000')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only remaining services equal to the total service value is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(['50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '500'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total service value is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum(variableName, '1000'), ...data(['51', '50', '50', '50', '50', '50', '50', '50', '50', '50', '500'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total service value is valid`,
  },
  // A sum more than one unit over or below the total service value is invalid
  {
    cell,
    data: [datum(variableName, '1000'), ...data(['52', '50', '50', '50', '50', '50', '50', '50', '50', '50', '500'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the total service value is invalid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(['40', '50', '50', '50', '50', '50', '50', '50', '50', '50', '500'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the total service value is invalid`,
  },
  // Remaining services count even when the ranked services already match the total
  {
    cell,
    data: [
      datum(variableName, '1000'),
      datum('_01st', '1000', 'service_provision_value_1000_national_currency'),
      datum('remaining_total', '2'),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: remaining services over the total service value is invalid`,
  },
  // Reported zeroes count as values, so zero services match a total service value of 0
  {
    cell,
    data: [datum(variableName, '0'), ...data(['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum(variableName, '0'), datum('_01st', '2', 'service_provision_value_1000_national_currency')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: over a total service value of 0 is invalid`,
  },
]
