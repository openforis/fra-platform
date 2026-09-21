import { ColName } from 'meta/assessment/col'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_4_5'
// The broadleaved total carries no formula, standing and lying check it against their sum
const colName = 'standing'
const variableName = 'broadleaved_2015'
const cell = { colName, tableName, variableName }
const lyingCell = { ...cell, colName: 'lying' }
const categories: Array<ColName> = ['standing', 'lying']

const datum = (raw: string, col = colName): NodeUpdate => ({ ...cell, colName: col, value: { raw } })

const data = (raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(raws[index], category))

// The metadata passes the parent as a raw name rather than a label key
const differentFromBroadleavedTotal = (valueRounded: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.valueEqualToSumParent',
      name: ValidatorName.equalToSum,
      params: {
        parentCol: { key: '' },
        parentTable: '',
        parentVariable: { key: 'table_4_5.broadleaved_2015[total]' },
        subcategories: '',
        valueRounded,
      },
    },
  ],
  valid: false,
})

export const broadleaved2015: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid`,
  },
  // Empty broadleaved total skips the validation
  {
    cell,
    data: data(['600', '400']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty broadleaved total is valid`,
  },
  {
    cell,
    data: [datum('1000', 'total')],
    expected: differentFromBroadleavedTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: broadleaved total without standing and lying is invalid`,
  },
  // Empty columns don't count as 0, so not even a broadleaved total of 0 matches them
  {
    cell,
    data: [datum('0', 'total')],
    expected: differentFromBroadleavedTotal('0.00'),
    name: `${ValidatorName.equalToSum}: broadleaved total of 0 without standing and lying is invalid`,
  },
  // Empty columns are left out of the sum
  {
    cell,
    data: [datum('600', 'total'), datum('600')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only standing equal to the broadleaved total is valid`,
  },
  {
    cell,
    data: [datum('400', 'total'), datum('400', 'lying')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only lying equal to the broadleaved total is valid`,
  },
  {
    cell,
    data: [datum('1000', 'total'), ...data(['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the broadleaved total is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum('1000', 'total'), ...data(['601', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the broadleaved total is valid`,
  },
  // A sum more than one unit over or below the broadleaved total is invalid
  {
    cell,
    data: [datum('1000', 'total'), ...data(['602', '400'])],
    expected: differentFromBroadleavedTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the broadleaved total is invalid`,
  },
  {
    cell,
    data: [datum('1000', 'total'), ...data(['590', '400'])],
    expected: differentFromBroadleavedTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the broadleaved total is invalid`,
  },
  // Reported zeroes count as values, so zero columns match a broadleaved total of 0
  {
    cell,
    data: [datum('0', 'total'), ...data(['0', '0'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum('0', 'total'), datum('2')],
    expected: differentFromBroadleavedTotal('0.00'),
    name: `${ValidatorName.equalToSum}: over a broadleaved total of 0 is invalid`,
  },
  // Lying is checked the same way against the broadleaved total
  {
    cell: lyingCell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid for lying`,
  },
  {
    cell: lyingCell,
    data: [datum('0', 'total')],
    expected: differentFromBroadleavedTotal('0.00'),
    name: `${ValidatorName.equalToSum}: broadleaved total of 0 without standing and lying is invalid for lying`,
  },
  {
    cell: lyingCell,
    data: [datum('1000', 'total'), ...data(['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: lying sum equal to the broadleaved total is valid`,
  },
  {
    cell: lyingCell,
    data: [datum('1000', 'total'), ...data(['600', '402'])],
    expected: differentFromBroadleavedTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: lying sum over the broadleaved total is invalid`,
  },
]
