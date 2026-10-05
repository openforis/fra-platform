import { ColName } from 'meta/assessment/col'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_4_4a'
const colName = 'total'
const variableName = 'total_forest_and_other_wooded_land_1990'
const cell = { colName, tableName, variableName }
const categories: Array<VariableName> = ['forest_1990', 'other_wooded_land_1990']

const datum = (name: VariableName, raw: string, col = colName): NodeUpdate => ({
  colName: col,
  tableName,
  value: { raw },
  variableName: name,
})

const data = (col: ColName, raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(category, raws[index], col))

// The metadata passes no labels to the formulas, so the message carries the validator defaults
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

export const totalForestAndOtherWoodedLand1990: Array<TableValidationTestCase> = [
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
    data: data(colName, ['600', '400']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total introduced tree species is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: total introduced tree species without forest and other wooded land is invalid`,
  },
  // Empty rows don't count as 0, so not even a total of 0 matches them
  {
    cell,
    data: [datum(variableName, '0')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total introduced tree species of 0 without forest and other wooded land is invalid`,
  },
  // Empty rows are left out of the sum
  {
    cell,
    data: [datum(variableName, '600'), datum('forest_1990', '600')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only forest equal to the total introduced tree species is valid`,
  },
  {
    cell,
    data: [datum(variableName, '400'), datum('other_wooded_land_1990', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only other wooded land equal to the total introduced tree species is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total introduced tree species is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['601', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total introduced tree species is valid`,
  },
  // A sum more than one unit over or below the total is invalid
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['602', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the total introduced tree species is invalid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['590', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the total introduced tree species is invalid`,
  },
  // Reported zeroes count as values, so zero rows match a total of 0
  {
    cell,
    data: [datum(variableName, '0'), ...data(colName, ['0', '0'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum(variableName, '0'), datum('forest_1990', '2')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: over a total introduced tree species of 0 is invalid`,
  },
  // The invasive column is checked the same way against its own total
  {
    cell: { ...cell, colName: '_of_which_invasive' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid for invasive`,
  },
  {
    cell: { ...cell, colName: '_of_which_invasive' },
    data: [datum(variableName, '0', '_of_which_invasive')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total invasive of 0 without forest and other wooded land is invalid`,
  },
  {
    cell: { ...cell, colName: '_of_which_invasive' },
    data: [datum(variableName, '1000', '_of_which_invasive'), ...data('_of_which_invasive', ['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: invasive sum equal to the total invasive is valid`,
  },
  {
    cell: { ...cell, colName: '_of_which_invasive' },
    data: [datum(variableName, '1000', '_of_which_invasive'), ...data('_of_which_invasive', ['602', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: invasive sum over the total invasive is invalid`,
  },
]
