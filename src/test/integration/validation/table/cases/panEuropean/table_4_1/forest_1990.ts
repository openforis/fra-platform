import { ColName } from 'meta/assessment/col'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_4_1'
const colName = 'area_with_number_of_tree_species_occurring_1'
const variableName = 'forest_1990'
const cell = { colName, tableName, variableName }
const categories: Array<ColName> = [
  'area_with_number_of_tree_species_occurring_1',
  'area_with_number_of_tree_species_occurring_2_3',
  'area_with_number_of_tree_species_occurring_4_5',
  'area_with_number_of_tree_species_occurring_6_pl',
]

const datum = (raw: string, col = colName): NodeUpdate => ({ ...cell, colName: col, value: { raw } })

const data = (raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(raws[index], category))

const forestArea = (raw: string): NodeUpdate => ({
  colName: 'area',
  tableName: 'table_1_1a',
  value: { raw },
  variableName,
})

const differentFromForestArea = (valueRounded: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.valueEqualToSumParent',
      name: ValidatorName.equalToSum,
      params: {
        parentCol: { key: 'panEuropean.forestArea.area1000Ha' },
        parentTable: '1.1.I',
        parentVariable: { key: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.forest' },
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
  // Empty forest area skips the validation
  {
    cell,
    data: data(['400', '300', '200', '100']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty forest area is valid`,
  },
  {
    cell,
    data: [forestArea('1000')],
    expected: differentFromForestArea('1000.00'),
    name: `${ValidatorName.equalToSum}: forest area without species categories is invalid`,
  },
  // Empty categories don't count as 0, so not even a forest area of 0 matches them
  {
    cell,
    data: [forestArea('0')],
    expected: differentFromForestArea('0.00'),
    name: `${ValidatorName.equalToSum}: forest area of 0 without species categories is invalid`,
  },
  // Empty categories are left out of the sum
  {
    cell,
    data: [forestArea('1000'), datum('1000')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only one species area equal to the forest area is valid`,
  },
  {
    cell,
    data: [forestArea('1000'), datum('1000', 'area_with_number_of_tree_species_occurring_2_3')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty one species area with two or three species equal to the forest area is valid`,
  },
  {
    cell,
    data: [forestArea('1000'), ...data(['400', '300', '200', '100'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the forest area is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [forestArea('1000'), ...data(['401', '300', '200', '100'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the forest area is valid`,
  },
  // A sum more than one unit over or below the forest area is invalid
  {
    cell,
    data: [forestArea('1000'), ...data(['402', '300', '200', '100'])],
    expected: differentFromForestArea('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the forest area is invalid`,
  },
  {
    cell,
    data: [forestArea('1000'), ...data(['390', '300', '200', '100'])],
    expected: differentFromForestArea('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the forest area is invalid`,
  },
  // Reported zeroes count as values, so zero categories match a forest area of 0
  {
    cell,
    data: [forestArea('0'), ...data(['0', '0', '0', '0'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [forestArea('0'), datum('2')],
    expected: differentFromForestArea('0.00'),
    name: `${ValidatorName.equalToSum}: over a forest area of 0 is invalid`,
  },
]
