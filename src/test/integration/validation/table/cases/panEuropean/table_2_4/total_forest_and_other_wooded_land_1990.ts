import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_2_4'
const colName = 'total_area_with_damage'
const variableName = 'total_forest_and_other_wooded_land_1990'
const cell = { colName, tableName, variableName }

const datum = (name: VariableName, raw: string, col = colName): NodeUpdate => ({
  colName: col,
  tableName,
  value: { raw },
  variableName: name,
})

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

// Only the disease column passes labels
const differentFromTotalDisease = (valueRounded: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.valueEqualToSumParent',
      name: ValidatorName.equalToSum,
      params: {
        parentCol: { key: 'panEuropean.forestAreaWithDamage.disease' },
        parentTable: '2.4',
        parentVariable: { key: 'panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land_only' },
        subcategories: [
          { key: 'panEuropean.forestAreaWithDamage.forest_only' },
          { key: 'panEuropean.forestAreaWithDamage.other_wooded_land_only' },
        ],
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
    data: [datum('forest_1990', '600'), datum('other_wooded_land_1990', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total area with damage is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: total area with damage without forest and other wooded land is invalid`,
  },
  // Empty rows don't count as 0, so not even a total of 0 matches them
  {
    cell,
    data: [datum(variableName, '0')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total area with damage of 0 without forest and other wooded land is invalid`,
  },
  // Empty rows are left out of the sum
  {
    cell,
    data: [datum(variableName, '600'), datum('forest_1990', '600')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only forest equal to the total area with damage is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), datum('forest_1990', '600'), datum('other_wooded_land_1990', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total area with damage is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum(variableName, '1000'), datum('forest_1990', '601'), datum('other_wooded_land_1990', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total area with damage is valid`,
  },
  // A sum more than one unit over or below the total is invalid
  {
    cell,
    data: [datum(variableName, '1000'), datum('forest_1990', '602'), datum('other_wooded_land_1990', '400')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the total area with damage is invalid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), datum('forest_1990', '590'), datum('other_wooded_land_1990', '400')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the total area with damage is invalid`,
  },
  // Reported zeroes count as values, so zero rows match a total of 0
  {
    cell,
    data: [datum(variableName, '0'), datum('forest_1990', '0'), datum('other_wooded_land_1990', '0')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum(variableName, '0'), datum('forest_1990', '2')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: over a total area with damage of 0 is invalid`,
  },
  // The damage causes are checked the same way against their own column
  {
    cell: { ...cell, colName: 'insects' },
    data: [
      datum(variableName, '1000', 'insects'),
      datum('forest_1990', '600', 'insects'),
      datum('other_wooded_land_1990', '400', 'insects'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: insects sum equal to the insects total is valid`,
  },
  {
    cell: { ...cell, colName: 'insects' },
    data: [
      datum(variableName, '1000', 'insects'),
      datum('forest_1990', '602', 'insects'),
      datum('other_wooded_land_1990', '400', 'insects'),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: insects sum over the insects total is invalid`,
  },
  {
    cell: { ...cell, colName: 'disease' },
    data: [
      datum(variableName, '1000', 'disease'),
      datum('forest_1990', '600', 'disease'),
      datum('other_wooded_land_1990', '400', 'disease'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: disease sum equal to the disease total is valid`,
  },
  {
    cell: { ...cell, colName: 'disease' },
    data: [
      datum(variableName, '1000', 'disease'),
      datum('forest_1990', '602', 'disease'),
      datum('other_wooded_land_1990', '400', 'disease'),
    ],
    expected: differentFromTotalDisease('1000.00'),
    name: `${ValidatorName.equalToSum}: disease sum over the disease total is invalid`,
  },
  {
    cell: { ...cell, colName: 'wildlife_and_grazing' },
    data: [
      datum(variableName, '1000', 'wildlife_and_grazing'),
      datum('forest_1990', '600', 'wildlife_and_grazing'),
      datum('other_wooded_land_1990', '400', 'wildlife_and_grazing'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: wildlife and grazing sum equal to the wildlife and grazing total is valid`,
  },
  {
    cell: { ...cell, colName: 'wildlife_and_grazing' },
    data: [
      datum(variableName, '1000', 'wildlife_and_grazing'),
      datum('forest_1990', '602', 'wildlife_and_grazing'),
      datum('other_wooded_land_1990', '400', 'wildlife_and_grazing'),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: wildlife and grazing sum over the wildlife and grazing total is invalid`,
  },
  {
    cell: { ...cell, colName: 'forest_operations' },
    data: [
      datum(variableName, '1000', 'forest_operations'),
      datum('forest_1990', '600', 'forest_operations'),
      datum('other_wooded_land_1990', '400', 'forest_operations'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: forest operations sum equal to the forest operations total is valid`,
  },
  {
    cell: { ...cell, colName: 'forest_operations' },
    data: [
      datum(variableName, '1000', 'forest_operations'),
      datum('forest_1990', '602', 'forest_operations'),
      datum('other_wooded_land_1990', '400', 'forest_operations'),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: forest operations sum over the forest operations total is invalid`,
  },
  {
    cell: { ...cell, colName: 'other' },
    data: [
      datum(variableName, '1000', 'other'),
      datum('forest_1990', '600', 'other'),
      datum('other_wooded_land_1990', '400', 'other'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: other sum equal to the other total is valid`,
  },
  {
    cell: { ...cell, colName: 'other' },
    data: [
      datum(variableName, '1000', 'other'),
      datum('forest_1990', '602', 'other'),
      datum('other_wooded_land_1990', '400', 'other'),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: other sum over the other total is invalid`,
  },
  {
    cell: { ...cell, colName: 'primarily_damaged_by_abiotic_agents' },
    data: [
      datum(variableName, '1000', 'primarily_damaged_by_abiotic_agents'),
      datum('forest_1990', '600', 'primarily_damaged_by_abiotic_agents'),
      datum('other_wooded_land_1990', '400', 'primarily_damaged_by_abiotic_agents'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: abiotic agents sum equal to the abiotic agents total is valid`,
  },
  {
    cell: { ...cell, colName: 'primarily_damaged_by_abiotic_agents' },
    data: [
      datum(variableName, '1000', 'primarily_damaged_by_abiotic_agents'),
      datum('forest_1990', '602', 'primarily_damaged_by_abiotic_agents'),
      datum('other_wooded_land_1990', '400', 'primarily_damaged_by_abiotic_agents'),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: abiotic agents sum over the abiotic agents total is invalid`,
  },
  {
    cell: { ...cell, colName: 'unspecified_mixed_damage_2025' },
    data: [
      datum(variableName, '1000', 'unspecified_mixed_damage_2025'),
      datum('forest_1990', '600', 'unspecified_mixed_damage_2025'),
      datum('other_wooded_land_1990', '400', 'unspecified_mixed_damage_2025'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: unspecified mixed damage 2025 sum equal to the unspecified mixed damage 2025 total is valid`,
  },
  {
    cell: { ...cell, colName: 'unspecified_mixed_damage_2025' },
    data: [
      datum(variableName, '1000', 'unspecified_mixed_damage_2025'),
      datum('forest_1990', '602', 'unspecified_mixed_damage_2025'),
      datum('other_wooded_land_1990', '400', 'unspecified_mixed_damage_2025'),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: unspecified mixed damage 2025 sum over the unspecified mixed damage 2025 total is invalid`,
  },
  {
    cell: { ...cell, colName: 'primarily_damaged_by_fire_total' },
    data: [
      datum(variableName, '1000', 'primarily_damaged_by_fire_total'),
      datum('forest_1990', '600', 'primarily_damaged_by_fire_total'),
      datum('other_wooded_land_1990', '400', 'primarily_damaged_by_fire_total'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: fire sum equal to the fire total is valid`,
  },
  {
    cell: { ...cell, colName: 'primarily_damaged_by_fire_total' },
    data: [
      datum(variableName, '1000', 'primarily_damaged_by_fire_total'),
      datum('forest_1990', '602', 'primarily_damaged_by_fire_total'),
      datum('other_wooded_land_1990', '400', 'primarily_damaged_by_fire_total'),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: fire sum over the fire total is invalid`,
  },
  {
    cell: { ...cell, colName: 'of_which_human_induced' },
    data: [
      datum(variableName, '1000', 'of_which_human_induced'),
      datum('forest_1990', '600', 'of_which_human_induced'),
      datum('other_wooded_land_1990', '400', 'of_which_human_induced'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: human induced sum equal to the human induced total is valid`,
  },
  {
    cell: { ...cell, colName: 'of_which_human_induced' },
    data: [
      datum(variableName, '1000', 'of_which_human_induced'),
      datum('forest_1990', '602', 'of_which_human_induced'),
      datum('other_wooded_land_1990', '400', 'of_which_human_induced'),
    ],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: human induced sum over the human induced total is invalid`,
  },
]
