import { ColName } from 'meta/assessment/col'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_3_2'
// The formula is the same on every column, so only the total volume is tested
const colName = 'total_volume'
const variableName = 'roundwood_1988'
const cell = { colName, tableName, variableName }
const categories: Array<ColName> = ['woodfuel_volume', 'industrial_roundwood_volume']

const datum = (raw: string, col = colName): NodeUpdate => ({ ...cell, colName: col, value: { raw } })

const data = (raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(raws[index], category))

// The metadata passes no labels to the formula, so the message carries the validator defaults
const differentFromTotalVolume = (valueRounded: string): TableValidationTestCase['expected'] => ({
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

export const roundwood1988: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid`,
  },
  // Empty total volume skips the validation
  {
    cell,
    data: data(['600', '400']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total volume is valid`,
  },
  {
    cell,
    data: [datum('1000')],
    expected: differentFromTotalVolume('1000.00'),
    name: `${ValidatorName.equalToSum}: total volume without categories is invalid`,
  },
  // Empty categories don't count as 0, so not even a total volume of 0 matches them
  {
    cell,
    data: [datum('0')],
    expected: differentFromTotalVolume('0.00'),
    name: `${ValidatorName.equalToSum}: total volume of 0 without categories is invalid`,
  },
  // Empty categories are left out of the sum
  {
    cell,
    data: [datum('1000'), datum('1000', 'woodfuel_volume')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only woodfuel volume equal to the total volume is valid`,
  },
  {
    cell,
    data: [datum('1000'), datum('1000', 'industrial_roundwood_volume')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only industrial roundwood volume equal to the total volume is valid`,
  },
  {
    cell,
    data: [datum('1000'), ...data(['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total volume is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum('1000'), ...data(['601', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total volume is valid`,
  },
  // A sum more than one unit over or below the total volume is invalid
  {
    cell,
    data: [datum('1000'), ...data(['602', '400'])],
    expected: differentFromTotalVolume('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the total volume is invalid`,
  },
  {
    cell,
    data: [datum('1000'), ...data(['590', '400'])],
    expected: differentFromTotalVolume('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the total volume is invalid`,
  },
  // Reported zeroes count as values, so zero categories match a total volume of 0
  {
    cell,
    data: [datum('0'), ...data(['0', '0'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum('0'), datum('2', 'woodfuel_volume')],
    expected: differentFromTotalVolume('0.00'),
    name: `${ValidatorName.equalToSum}: over a total volume of 0 is invalid`,
  },
]
