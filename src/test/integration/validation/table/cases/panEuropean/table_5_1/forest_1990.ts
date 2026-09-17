import { ColName } from 'meta/assessment/col'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_5_1'
// The formula is the same on every column, so only the total is tested
const colName = 'total'
const variableName = 'forest_1990'
const cell = { colName, tableName, variableName }
const functions: Array<ColName> = [
  'infrastructure_and_managed_natural_resources',
  'soil_water_and_other_forest_ecosystem_functions',
]

const datum = (raw: string, col = colName): NodeUpdate => ({ ...cell, colName: col, value: { raw } })

const data = (raws: Array<string>): Array<NodeUpdate> => functions.map((fn, index) => datum(raws[index], fn))

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

export const forest1990: Array<TableValidationTestCase> = [
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
    data: data(['600', '400']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total is valid`,
  },
  {
    cell,
    data: [datum('1000')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: total without protective functions is invalid`,
  },
  // Empty functions don't count as 0, so not even a total of 0 matches them
  {
    cell,
    data: [datum('0')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total of 0 without protective functions is invalid`,
  },
  // Empty functions are left out of the sum
  {
    cell,
    data: [datum('600'), datum('600', 'infrastructure_and_managed_natural_resources')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only infrastructure equal to the total is valid`,
  },
  {
    cell,
    data: [datum('400'), datum('400', 'soil_water_and_other_forest_ecosystem_functions')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only soil and water equal to the total is valid`,
  },
  {
    cell,
    data: [datum('1000'), ...data(['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum('1000'), ...data(['601', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total is valid`,
  },
  // A sum more than one unit over or below the total is invalid
  {
    cell,
    data: [datum('1000'), ...data(['602', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the total is invalid`,
  },
  {
    cell,
    data: [datum('1000'), ...data(['590', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the total is invalid`,
  },
  // Reported zeroes count as values, so zero functions match a total of 0
  {
    cell,
    data: [datum('0'), ...data(['0', '0'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum('0'), datum('2', 'infrastructure_and_managed_natural_resources')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: over a total of 0 is invalid`,
  },
]
