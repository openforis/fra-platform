import { ColName } from 'meta/assessment/col'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_4_3a'
const colName = 'undisturbed_by_man'
const variableName = 'forest_1990'
const cell = { colName, tableName, variableName }
const naturalnessClasses: Array<ColName> = ['undisturbed_by_man', 'semi_natural', 'plantations']

const datum = (raw: string, col = colName): NodeUpdate => ({ ...cell, colName: col, value: { raw } })

const data = (raws: Array<string>): Array<NodeUpdate> =>
  naturalnessClasses.map((naturalnessClass, index) => datum(raws[index], naturalnessClass))

const forestArea = (raw: string): NodeUpdate => ({
  colName: 'area',
  tableName: 'table_1_1a',
  value: { raw },
  variableName: 'forest_1990',
})

// The metadata passes the 4.4 label and the anchor 1.1a, the message carries them as they are
const differentFromForestArea = (valueRounded: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.valueEqualToSumParent',
      name: ValidatorName.equalToSum,
      params: {
        parentCol: { key: 'panEuropean.forestArea.area1000Ha' },
        parentTable: '1.1a',
        parentVariable: { key: 'panEuropean.introducedTreeSpecies.forest_only' },
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
    data: data(['600', '300', '100']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty forest area is valid`,
  },
  {
    cell,
    data: [forestArea('1000')],
    expected: differentFromForestArea('1000.00'),
    name: `${ValidatorName.equalToSum}: forest area without naturalness classes is invalid`,
  },
  // Empty classes don't count as 0, so not even a forest area of 0 matches them
  {
    cell,
    data: [forestArea('0')],
    expected: differentFromForestArea('0.00'),
    name: `${ValidatorName.equalToSum}: forest area of 0 without naturalness classes is invalid`,
  },
  // Empty classes are left out of the sum
  {
    cell,
    data: [forestArea('1000'), datum('1000')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only undisturbed by man equal to the forest area is valid`,
  },
  {
    cell,
    data: [forestArea('1000'), datum('600', 'semi_natural'), datum('400', 'plantations')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty undisturbed by man with the other classes equal to the forest area is valid`,
  },
  {
    cell,
    data: [forestArea('1000'), ...data(['600', '300', '100'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the forest area is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [forestArea('1000'), ...data(['601', '300', '100'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the forest area is valid`,
  },
  // A sum more than one unit over or below the forest area is invalid
  {
    cell,
    data: [forestArea('1000'), ...data(['602', '300', '100'])],
    expected: differentFromForestArea('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the forest area is invalid`,
  },
  {
    cell,
    data: [forestArea('1000'), ...data(['590', '300', '100'])],
    expected: differentFromForestArea('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the forest area is invalid`,
  },
  // Reported zeroes count as values, so zero classes match a forest area of 0
  {
    cell,
    data: [forestArea('0'), ...data(['0', '0', '0'])],
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
