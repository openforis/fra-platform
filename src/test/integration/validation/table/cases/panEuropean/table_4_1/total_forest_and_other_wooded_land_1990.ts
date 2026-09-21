import { ColName } from 'meta/assessment/col'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_4_1'
const colName = 'area_with_number_of_tree_species_occurring_1'
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
  // Empty total area skips the validation
  {
    cell,
    data: data(colName, ['600', '400']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total area with one species is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: total area with one species without forest and other wooded land is invalid`,
  },
  // Empty rows don't count as 0, so not even a total area of 0 matches them
  {
    cell,
    data: [datum(variableName, '0')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total area with one species of 0 without forest and other wooded land is invalid`,
  },
  // Empty rows are left out of the sum
  {
    cell,
    data: [datum(variableName, '600'), datum('forest_1990', '600')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only forest equal to the total area with one species is valid`,
  },
  {
    cell,
    data: [datum(variableName, '400'), datum('other_wooded_land_1990', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only other wooded land equal to the total area with one species is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: one species sum equal to the total area is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['601', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: one species sum one unit over the total area is valid`,
  },
  // A sum more than one unit over or below the total area is invalid
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['602', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: one species sum over the total area is invalid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['590', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: one species sum below the total area is invalid`,
  },
  // Reported zeroes count as values, so zero rows match a total area of 0
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
    name: `${ValidatorName.equalToSum}: over a total area with one species of 0 is invalid`,
  },
  // The other species categories are checked the same way against their own total area
  {
    cell: { ...cell, colName: 'area_with_number_of_tree_species_occurring_2_3' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid for two or three species`,
  },
  {
    cell: { ...cell, colName: 'area_with_number_of_tree_species_occurring_2_3' },
    data: [datum(variableName, '0', 'area_with_number_of_tree_species_occurring_2_3')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total area with two or three species of 0 without forest and other wooded land is invalid`,
  },
  {
    cell: { ...cell, colName: 'area_with_number_of_tree_species_occurring_2_3' },
    data: [
      datum(variableName, '1000', 'area_with_number_of_tree_species_occurring_2_3'),
      ...data('area_with_number_of_tree_species_occurring_2_3', ['600', '400']),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: two or three species sum equal to the total area is valid`,
  },
  {
    cell: { ...cell, colName: 'area_with_number_of_tree_species_occurring_2_3' },
    data: [
      datum(variableName, '1000', 'area_with_number_of_tree_species_occurring_2_3'),
      ...data('area_with_number_of_tree_species_occurring_2_3', ['602', '400']),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: two or three species sum over the total area is invalid`,
  },
  {
    cell: { ...cell, colName: 'area_with_number_of_tree_species_occurring_4_5' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid for four or five species`,
  },
  {
    cell: { ...cell, colName: 'area_with_number_of_tree_species_occurring_4_5' },
    data: [datum(variableName, '0', 'area_with_number_of_tree_species_occurring_4_5')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total area with four or five species of 0 without forest and other wooded land is invalid`,
  },
  {
    cell: { ...cell, colName: 'area_with_number_of_tree_species_occurring_4_5' },
    data: [
      datum(variableName, '1000', 'area_with_number_of_tree_species_occurring_4_5'),
      ...data('area_with_number_of_tree_species_occurring_4_5', ['600', '400']),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: four or five species sum equal to the total area is valid`,
  },
  {
    cell: { ...cell, colName: 'area_with_number_of_tree_species_occurring_4_5' },
    data: [
      datum(variableName, '1000', 'area_with_number_of_tree_species_occurring_4_5'),
      ...data('area_with_number_of_tree_species_occurring_4_5', ['602', '400']),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: four or five species sum over the total area is invalid`,
  },
  {
    cell: { ...cell, colName: 'area_with_number_of_tree_species_occurring_6_pl' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid for six or more species`,
  },
  {
    cell: { ...cell, colName: 'area_with_number_of_tree_species_occurring_6_pl' },
    data: [datum(variableName, '0', 'area_with_number_of_tree_species_occurring_6_pl')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total area with six or more species of 0 without forest and other wooded land is invalid`,
  },
  {
    cell: { ...cell, colName: 'area_with_number_of_tree_species_occurring_6_pl' },
    data: [
      datum(variableName, '1000', 'area_with_number_of_tree_species_occurring_6_pl'),
      ...data('area_with_number_of_tree_species_occurring_6_pl', ['600', '400']),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: six or more species sum equal to the total area is valid`,
  },
  {
    cell: { ...cell, colName: 'area_with_number_of_tree_species_occurring_6_pl' },
    data: [
      datum(variableName, '1000', 'area_with_number_of_tree_species_occurring_6_pl'),
      ...data('area_with_number_of_tree_species_occurring_6_pl', ['602', '400']),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: six or more species sum over the total area is invalid`,
  },
]
