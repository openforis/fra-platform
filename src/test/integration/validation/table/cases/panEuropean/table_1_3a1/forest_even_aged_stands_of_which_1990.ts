import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'
import { buildTotalAreaCases } from './_buildTotalAreaCases'

const tableName = 'table_1_3a1'
const colName = 'total_area'
const variableName = 'forest_even_aged_stands_of_which_1990'
const cell = { colName, tableName, variableName }

const datum = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })

const forestArea = (raw: string): NodeUpdate => ({
  colName: 'area',
  tableName: 'table_1_1a',
  value: { raw },
  variableName: 'forest_1990',
})

const unevenAgedStands = (raw: string): NodeUpdate => ({
  colName: 'area',
  tableName: 'table_1_3b',
  value: { raw },
  variableName: 'forest_uneven_aged_stands_1990',
})

const differentFromForestArea = (valueRounded: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.valueEqualToSumParent',
      name: ValidatorName.equalToSum,
      params: {
        parentCol: { key: 'panEuropean.forestArea.area1000Ha' },
        parentTable: '1.1.I',
        parentVariable: { key: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest' },
        subcategories: [
          { key: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged' },
          { key: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_uneven_aged' },
        ],
        valueRounded,
      },
    },
  ],
  valid: false,
})

export const forestEvenAgedStandsOfWhich1990: Array<TableValidationTestCase> = [
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
    data: [datum('600'), unevenAgedStands('400')],
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
    data: [forestArea('600'), unevenAgedStands('600')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty even aged stands is valid`,
  },
  {
    cell,
    data: [forestArea('600'), datum('600')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only even aged stands equal to the forest area is valid`,
  },
  {
    cell,
    data: [forestArea('1000'), datum('600'), unevenAgedStands('400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the forest area is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [forestArea('1000'), datum('601'), unevenAgedStands('400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the forest area is valid`,
  },
  // A sum more than one unit over or below the forest area is invalid
  {
    cell,
    data: [forestArea('1000'), datum('602'), unevenAgedStands('400')],
    expected: differentFromForestArea('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the forest area is invalid`,
  },
  {
    cell,
    data: [forestArea('1000'), datum('590'), unevenAgedStands('400')],
    expected: differentFromForestArea('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the forest area is invalid`,
  },
  // Reported zeroes count as values, so zero stands match a forest area of 0
  {
    cell,
    data: [forestArea('0'), datum('0'), unevenAgedStands('0')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [forestArea('0'), datum('2')],
    expected: differentFromForestArea('0.00'),
    name: `${ValidatorName.equalToSum}: over a forest area of 0 is invalid`,
  },
  // The total area carries the forest area formula, so the phases formula is tested on the intermediate phase
  ...buildTotalAreaCases({
    colName: 'intermediate_phase',
    parentVariable: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged',
    variableName,
  }),
]
