import { ColName } from 'meta/assessment/col'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_1_3b'
const colName = 'area'
const variableName = 'forest_uneven_aged_stands_1990'
const cell = { colName, tableName, variableName }
// The area carries the forest area formula, the other columns carry the volume formula
const volumeCell = { ...cell, colName: 'total_volume' }
const diameterClasses: Array<ColName> = [
  'less_or_equal_20_cm',
  '_21_40_cm',
  '_41_60_cm',
  'greater_60_cm',
  'unspecified',
]

const datum = (raw: string, col = colName): NodeUpdate => ({ ...cell, colName: col, value: { raw } })

const data = (raws: Array<string>): Array<NodeUpdate> =>
  diameterClasses.map((diameterClass, index) => datum(raws[index], diameterClass))

const forestArea = (raw: string): NodeUpdate => ({
  colName: 'area',
  tableName: 'table_1_1a',
  value: { raw },
  variableName: 'forest_1990',
})

const evenAgedStands = (raw: string): NodeUpdate => ({
  colName: 'total_area',
  tableName: 'table_1_3a1',
  value: { raw },
  variableName: 'forest_even_aged_stands_of_which_1990',
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
        subcategories: [
          { key: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which' },
          { key: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.forest_uneven_aged_stands' },
        ],
        valueRounded,
      },
    },
  ],
  valid: false,
})

// The metadata passes no labels to the volume formula, so the message carries the validator defaults
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

export const forestUnevenAgedStands1990: Array<TableValidationTestCase> = [
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
    data: [evenAgedStands('600'), datum('400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty forest area is valid`,
  },
  {
    cell,
    data: [forestArea('1000')],
    expected: differentFromForestArea('1000.00'),
    name: `${ValidatorName.equalToSum}: forest area without stands is invalid`,
  },
  // Empty stands don't count as 0, so not even a forest area of 0 matches them
  {
    cell,
    data: [forestArea('0')],
    expected: differentFromForestArea('0.00'),
    name: `${ValidatorName.equalToSum}: forest area of 0 without stands is invalid`,
  },
  // Empty stands are left out of the sum
  {
    cell,
    data: [forestArea('600'), evenAgedStands('600')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty uneven aged stands is valid`,
  },
  {
    cell,
    data: [forestArea('400'), datum('400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only uneven aged stands equal to the forest area is valid`,
  },
  {
    cell,
    data: [forestArea('1000'), evenAgedStands('600'), datum('400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the forest area is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [forestArea('1000'), evenAgedStands('600'), datum('401')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the forest area is valid`,
  },
  // A sum more than one unit over or below the forest area is invalid
  {
    cell,
    data: [forestArea('1000'), evenAgedStands('600'), datum('402')],
    expected: differentFromForestArea('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the forest area is invalid`,
  },
  {
    cell,
    data: [forestArea('1000'), evenAgedStands('600'), datum('390')],
    expected: differentFromForestArea('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the forest area is invalid`,
  },
  // Reported zeroes count as values, so zero stands match a forest area of 0
  {
    cell,
    data: [forestArea('0'), evenAgedStands('0'), datum('0')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [forestArea('0'), datum('2')],
    expected: differentFromForestArea('0.00'),
    name: `${ValidatorName.equalToSum}: over a forest area of 0 is invalid`,
  },
  // Nothing reported yet is valid for the volume formula either
  {
    cell: volumeCell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid for the total volume`,
  },
  // Empty total volume skips the validation
  {
    cell: volumeCell,
    data: data(['400', '300', '200', '50', '50']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total volume is valid`,
  },
  {
    cell: volumeCell,
    data: [datum('1000', 'total_volume')],
    expected: differentFromTotalVolume('1000.00'),
    name: `${ValidatorName.equalToSum}: total volume without diameter classes is invalid`,
  },
  // Empty diameter classes don't count as 0, so not even a total volume of 0 matches them
  {
    cell: volumeCell,
    data: [datum('0', 'total_volume')],
    expected: differentFromTotalVolume('0.00'),
    name: `${ValidatorName.equalToSum}: total volume of 0 without diameter classes is invalid`,
  },
  {
    cell: volumeCell,
    data: [datum('1000', 'total_volume'), ...data(['400', '300', '200', '50', '50'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total volume is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell: volumeCell,
    data: [datum('1000', 'total_volume'), ...data(['401', '300', '200', '50', '50'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total volume is valid`,
  },
  // A sum more than one unit over or below the total volume is invalid
  {
    cell: volumeCell,
    data: [datum('1000', 'total_volume'), ...data(['402', '300', '200', '50', '50'])],
    expected: differentFromTotalVolume('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the total volume is invalid`,
  },
  {
    cell: volumeCell,
    data: [datum('1000', 'total_volume'), ...data(['390', '300', '200', '50', '50'])],
    expected: differentFromTotalVolume('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the total volume is invalid`,
  },
  {
    cell: volumeCell,
    data: [datum('0', 'total_volume'), datum('2', 'less_or_equal_20_cm')],
    expected: differentFromTotalVolume('0.00'),
    name: `${ValidatorName.equalToSum}: over a total volume of 0 is invalid`,
  },
]
