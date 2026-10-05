import { ColName } from 'meta/assessment/col'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_6_4a'
// The formula is the same on every column, so only the total is tested
const colName = 'total'
const variableName = 'forestry_isic_nace_02_1990'
const cell = { colName, tableName, variableName }
const categories: Array<ColName> = [
  'other_gross_fixed_capital_formation',
  'planting_of_trees_to_provide_regular_income',
  'equipment_and_buildings',
]

const datum = (raw: string, col = colName): NodeUpdate => ({ ...cell, colName: col, value: { raw } })

const data = (raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(raws[index], category))

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

export const forestryIsicNace021990: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid`,
  },
  // Empty total skips the validation
  {
    cell,
    data: data(['600', '300', '100']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total is valid`,
  },
  {
    cell,
    data: [datum('1000')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: total without capital formation types is invalid`,
  },
  // Empty types don't count as 0, so not even a total of 0 matches them
  {
    cell,
    data: [datum('0')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total of 0 without capital formation types is invalid`,
  },
  // Empty types are left out of the sum
  {
    cell,
    data: [datum('600'), datum('600', 'other_gross_fixed_capital_formation')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only other capital formation equal to the total is valid`,
  },
  {
    cell,
    data: [datum('300'), datum('300', 'planting_of_trees_to_provide_regular_income')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only planting of trees equal to the total is valid`,
  },
  {
    cell,
    data: [datum('100'), datum('100', 'equipment_and_buildings')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only equipment and buildings equal to the total is valid`,
  },
  {
    cell,
    data: [datum('1000'), ...data(['600', '300', '100'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum('1000'), ...data(['601', '300', '100'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total is valid`,
  },
  // A sum more than one unit over or below the total is invalid
  {
    cell,
    data: [datum('1000'), ...data(['602', '300', '100'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the total is invalid`,
  },
  {
    cell,
    data: [datum('1000'), ...data(['590', '300', '100'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the total is invalid`,
  },
  // Reported zeroes count as values, so zero types match a total of 0
  {
    cell,
    data: [datum('0'), ...data(['0', '0', '0'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum('0'), datum('2', 'other_gross_fixed_capital_formation')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: over a total of 0 is invalid`,
  },
]
