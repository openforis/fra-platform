import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_3_3'
// The total market value uses this column name, but its type is decimal
const colName = 'name_of_groups_of_product'
const variableName = 'total'
const cell = { colName, tableName, variableName }
const products: Array<VariableName> = [
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
  ...products.map((name, index) => datum(name, raws[index], 'market_value_1000_national_currency')),
  datum('all_other_plant_products', raws[10]),
  datum('all_other_animal_products', raws[11]),
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
  // Empty total market value skips the validation
  {
    cell,
    data: data(['50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '300', '200']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total market value is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: total market value without products is invalid`,
  },
  // Empty products don't count as 0, so not even a total market value of 0 matches them
  {
    cell,
    data: [datum(variableName, '0')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total market value of 0 without products is invalid`,
  },
  // Empty products are left out of the sum
  {
    cell,
    data: [datum(variableName, '1000'), datum('_01st', '1000', 'market_value_1000_national_currency')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only the first product equal to the total market value is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), datum('all_other_plant_products', '1000')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only other plant products equal to the total market value is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), datum('all_other_animal_products', '1000')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only other animal products equal to the total market value is valid`,
  },
  {
    cell,
    data: [
      datum(variableName, '1000'),
      ...data(['50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '300', '200']),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total market value is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [
      datum(variableName, '1000'),
      ...data(['51', '50', '50', '50', '50', '50', '50', '50', '50', '50', '300', '200']),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total market value is valid`,
  },
  // A sum more than one unit over or below the total market value is invalid
  {
    cell,
    data: [
      datum(variableName, '1000'),
      ...data(['52', '50', '50', '50', '50', '50', '50', '50', '50', '50', '300', '200']),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the total market value is invalid`,
  },
  {
    cell,
    data: [
      datum(variableName, '1000'),
      ...data(['40', '50', '50', '50', '50', '50', '50', '50', '50', '50', '300', '200']),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the total market value is invalid`,
  },
  // Other plant and animal products count even when the ranked products already match the total
  {
    cell,
    data: [
      datum(variableName, '1000'),
      datum('_01st', '1000', 'market_value_1000_national_currency'),
      datum('all_other_plant_products', '2'),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: other plant products over the total market value is invalid`,
  },
  {
    cell,
    data: [
      datum(variableName, '1000'),
      datum('_01st', '1000', 'market_value_1000_national_currency'),
      datum('all_other_animal_products', '2'),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: other animal products over the total market value is invalid`,
  },
  // Reported zeroes count as values, so zero products match a total market value of 0
  {
    cell,
    data: [datum(variableName, '0'), ...data(['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum(variableName, '0'), datum('_01st', '2', 'market_value_1000_national_currency')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: over a total market value of 0 is invalid`,
  },
]
