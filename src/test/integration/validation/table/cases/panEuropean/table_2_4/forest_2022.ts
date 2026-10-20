import { ColName } from 'meta/assessment/col'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_2_4'
const colName = 'total_area_with_damage'
// Only the 2022 row carries this formula, the other forest years and the other wooded land rows have none
const variableName = 'forest_2022'
const cell = { colName, tableName, variableName }
const causes: Array<ColName> = [
  'insects',
  'disease',
  'wildlife_and_grazing',
  'forest_operations',
  'other',
  'primarily_damaged_by_abiotic_agents',
  'primarily_damaged_by_fire_total',
  'unspecified_mixed_damage_2025',
]

const datum = (raw: string, col = colName): NodeUpdate => ({ ...cell, colName: col, value: { raw } })

const data = (raws: Array<string>): Array<NodeUpdate> => causes.map((cause, index) => datum(raws[index], cause))

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

export const forest2022: Array<TableValidationTestCase> = [
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
    data: data(['300', '200', '100', '100', '100', '100', '50', '50']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total area with damage is valid`,
  },
  {
    cell,
    data: [datum('1000')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: total area with damage without causes is invalid`,
  },
  // Empty causes don't count as 0, so not even a total of 0 matches them
  {
    cell,
    data: [datum('0')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total area with damage of 0 without causes is invalid`,
  },
  // Empty causes are left out of the sum
  {
    cell,
    data: [datum('300'), datum('300', 'insects')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only insects equal to the total area with damage is valid`,
  },
  {
    cell,
    data: [datum('1000'), ...data(['300', '200', '100', '100', '100', '100', '50', '50'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total area with damage is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum('1000'), ...data(['301', '200', '100', '100', '100', '100', '50', '50'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total area with damage is valid`,
  },
  // A sum more than one unit over or below the total is invalid
  {
    cell,
    data: [datum('1000'), ...data(['302', '200', '100', '100', '100', '100', '50', '50'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the total area with damage is invalid`,
  },
  {
    cell,
    data: [datum('1000'), ...data(['290', '200', '100', '100', '100', '100', '50', '50'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the total area with damage is invalid`,
  },
  // Reported zeroes count as values, so zero causes match a total of 0
  {
    cell,
    data: [datum('0'), ...data(['0', '0', '0', '0', '0', '0', '0', '0'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum('0'), datum('2', 'insects')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: over a total area with damage of 0 is invalid`,
  },
]
