import { ColName } from 'meta/assessment/col'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_4_9'
const colName = 'mcpfe_class_1_1'
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
    name: `${ValidatorName.equalToSum}: empty total class 1.1 is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: total class 1.1 without forest and other wooded land is invalid`,
  },
  // Empty rows don't count as 0, so not even a total of 0 matches them
  {
    cell,
    data: [datum(variableName, '0')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total class 1.1 of 0 without forest and other wooded land is invalid`,
  },
  // Empty rows are left out of the sum
  {
    cell,
    data: [datum(variableName, '600'), datum('forest_1990', '600')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only forest equal to the total class 1.1 is valid`,
  },
  {
    cell,
    data: [datum(variableName, '400'), datum('other_wooded_land_1990', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only other wooded land equal to the total class 1.1 is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: class 1.1 sum equal to the total is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['601', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: class 1.1 sum one unit over the total is valid`,
  },
  // A sum more than one unit over or below the total is invalid
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['602', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: class 1.1 sum over the total is invalid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['590', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: class 1.1 sum below the total is invalid`,
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
    name: `${ValidatorName.equalToSum}: over a total class 1.1 of 0 is invalid`,
  },
  // The other MCPFE classes are checked the same way against their own total
  {
    cell: { ...cell, colName: 'mcpfe_class_1_2' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid for class 1.2`,
  },
  {
    cell: { ...cell, colName: 'mcpfe_class_1_2' },
    data: [datum(variableName, '0', 'mcpfe_class_1_2')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total class 1.2 of 0 without forest and other wooded land is invalid`,
  },
  {
    cell: { ...cell, colName: 'mcpfe_class_1_2' },
    data: [datum(variableName, '1000', 'mcpfe_class_1_2'), ...data('mcpfe_class_1_2', ['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: class 1.2 sum equal to the total is valid`,
  },
  {
    cell: { ...cell, colName: 'mcpfe_class_1_2' },
    data: [datum(variableName, '1000', 'mcpfe_class_1_2'), ...data('mcpfe_class_1_2', ['602', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: class 1.2 sum over the total is invalid`,
  },
  {
    cell: { ...cell, colName: 'mcpfe_class_1_3' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid for class 1.3`,
  },
  {
    cell: { ...cell, colName: 'mcpfe_class_1_3' },
    data: [datum(variableName, '0', 'mcpfe_class_1_3')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total class 1.3 of 0 without forest and other wooded land is invalid`,
  },
  {
    cell: { ...cell, colName: 'mcpfe_class_1_3' },
    data: [datum(variableName, '1000', 'mcpfe_class_1_3'), ...data('mcpfe_class_1_3', ['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: class 1.3 sum equal to the total is valid`,
  },
  {
    cell: { ...cell, colName: 'mcpfe_class_1_3' },
    data: [datum(variableName, '1000', 'mcpfe_class_1_3'), ...data('mcpfe_class_1_3', ['602', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: class 1.3 sum over the total is invalid`,
  },
  {
    cell: { ...cell, colName: 'mcpfe_class_2' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid for class 2`,
  },
  {
    cell: { ...cell, colName: 'mcpfe_class_2' },
    data: [datum(variableName, '0', 'mcpfe_class_2')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total class 2 of 0 without forest and other wooded land is invalid`,
  },
  {
    cell: { ...cell, colName: 'mcpfe_class_2' },
    data: [datum(variableName, '1000', 'mcpfe_class_2'), ...data('mcpfe_class_2', ['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: class 2 sum equal to the total is valid`,
  },
  {
    cell: { ...cell, colName: 'mcpfe_class_2' },
    data: [datum(variableName, '1000', 'mcpfe_class_2'), ...data('mcpfe_class_2', ['602', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: class 2 sum over the total is invalid`,
  },
]
