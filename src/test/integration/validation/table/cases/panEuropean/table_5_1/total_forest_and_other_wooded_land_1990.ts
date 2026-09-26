import { ColName } from 'meta/assessment/col'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_5_1'
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
    name: `${ValidatorName.equalToSum}: empty total protective forest is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: total protective forest without forest and other wooded land is invalid`,
  },
  // Empty rows don't count as 0, so not even a total of 0 matches them
  {
    cell,
    data: [datum(variableName, '0')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total protective forest of 0 without forest and other wooded land is invalid`,
  },
  // Empty rows are left out of the sum
  {
    cell,
    data: [datum(variableName, '600'), datum('forest_1990', '600')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only forest equal to the total protective forest is valid`,
  },
  {
    cell,
    data: [datum(variableName, '400'), datum('other_wooded_land_1990', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only other wooded land equal to the total protective forest is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total protective forest is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['601', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total protective forest is valid`,
  },
  // A sum more than one unit over or below the total is invalid
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['602', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the total protective forest is invalid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(colName, ['590', '400'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the total protective forest is invalid`,
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
    name: `${ValidatorName.equalToSum}: over a total protective forest of 0 is invalid`,
  },
  // The protective functions are checked the same way against their own column
  {
    cell: { ...cell, colName: 'infrastructure_and_managed_natural_resources' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid for infrastructure`,
  },
  {
    cell: { ...cell, colName: 'infrastructure_and_managed_natural_resources' },
    data: [datum(variableName, '0', 'infrastructure_and_managed_natural_resources')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total infrastructure of 0 without forest and other wooded land is invalid`,
  },
  {
    cell: { ...cell, colName: 'infrastructure_and_managed_natural_resources' },
    data: [
      datum(variableName, '1000', 'infrastructure_and_managed_natural_resources'),
      ...data('infrastructure_and_managed_natural_resources', ['600', '400']),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: infrastructure sum equal to the total infrastructure is valid`,
  },
  {
    cell: { ...cell, colName: 'infrastructure_and_managed_natural_resources' },
    data: [
      datum(variableName, '1000', 'infrastructure_and_managed_natural_resources'),
      ...data('infrastructure_and_managed_natural_resources', ['602', '400']),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: infrastructure sum over the total infrastructure is invalid`,
  },
  {
    cell: { ...cell, colName: 'soil_water_and_other_forest_ecosystem_functions' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid for soil and water`,
  },
  {
    cell: { ...cell, colName: 'soil_water_and_other_forest_ecosystem_functions' },
    data: [datum(variableName, '0', 'soil_water_and_other_forest_ecosystem_functions')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total soil and water of 0 without forest and other wooded land is invalid`,
  },
  {
    cell: { ...cell, colName: 'soil_water_and_other_forest_ecosystem_functions' },
    data: [
      datum(variableName, '1000', 'soil_water_and_other_forest_ecosystem_functions'),
      ...data('soil_water_and_other_forest_ecosystem_functions', ['600', '400']),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: soil and water sum equal to the total soil and water is valid`,
  },
  {
    cell: { ...cell, colName: 'soil_water_and_other_forest_ecosystem_functions' },
    data: [
      datum(variableName, '1000', 'soil_water_and_other_forest_ecosystem_functions'),
      ...data('soil_water_and_other_forest_ecosystem_functions', ['602', '400']),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: soil and water sum over the total soil and water is invalid`,
  },
]
