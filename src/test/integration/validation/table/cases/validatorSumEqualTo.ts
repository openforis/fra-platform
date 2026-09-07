import { TableNames } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../types'

const tableName = TableNames.climaticDomain
const colName = 'percentOfForestArea2015'
const cell = { colName, tableName, variableName: 'boreal' }

// Formulas copied from the fra 2025 metadata row climaticDomain.boreal
const rows: TableValidationTestCase['rows'] = [
  {
    cols: [{ colName }],
    tableName,
    validateFns: [
      'validatorNotGreaterThan(climaticDomain.boreal, 100)',
      "validatorSumEqualTo([climaticDomain.boreal,climaticDomain.temperate,climaticDomain.sub_tropical,climaticDomain.tropical], ['climaticDomain.boreal','climaticDomain.temperate','climaticDomain.subtropical','climaticDomain.tropical'], 100)",
    ],
    variableName: 'boreal',
  },
  { cols: [{ colName }], tableName, variableName: 'temperate' },
  { cols: [{ colName }], tableName, variableName: 'sub_tropical' },
  { cols: [{ colName }], tableName, variableName: 'tropical' },
]

const boreal = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })
const temperate = (raw: string): NodeUpdate => ({ colName, tableName, value: { raw }, variableName: 'temperate' })
const subtropical = (raw: string): NodeUpdate => ({ colName, tableName, value: { raw }, variableName: 'sub_tropical' })
const tropical = (raw: string): NodeUpdate => ({ colName, tableName, value: { raw }, variableName: 'tropical' })

const invalid = (categoriesSum: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.sumEqualTo',
      name: ValidatorName.sumEqualTo,
      params: {
        categoriesSum,
        categoryLabelKeys: [
          'climaticDomain.boreal',
          'climaticDomain.temperate',
          'climaticDomain.subtropical',
          'climaticDomain.tropical',
        ],
        maxValue: '100.00',
      },
    },
  ],
  valid: false,
})

export const validatorSumEqualTo: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: empty data is valid`,
    rows,
  },
  // Each missing category skips the validation, even when the other values do not sum to 100
  {
    cell,
    data: [temperate('25'), subtropical('25'), tropical('25')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: empty boreal is valid`,
    rows,
  },
  {
    cell,
    data: [boreal('25'), subtropical('25'), tropical('25')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: empty temperate is valid`,
    rows,
  },
  {
    cell,
    data: [boreal('25'), temperate('25'), tropical('25')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: empty subtropical is valid`,
    rows,
  },
  {
    cell,
    data: [boreal('25'), temperate('25'), subtropical('25')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: empty tropical is valid`,
    rows,
  },
  // Fully reported percentages must sum to exactly 100
  {
    cell,
    data: [boreal('25'), temperate('25'), subtropical('25'), tropical('25')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: sum of 100 is valid`,
    rows,
  },
  {
    cell,
    data: [boreal('0.1'), temperate('0.2'), subtropical('0.3'), tropical('99.4')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: decimal sum of 100 is valid`,
    rows,
  },
  {
    cell,
    data: [boreal('0'), temperate('100'), subtropical('0'), tropical('0')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: zero categories with sum of 100 are valid`,
    rows,
  },
  // Reported zeroes count as values, so an all-zero total is invalid
  {
    cell,
    data: [boreal('0'), temperate('0'), subtropical('0'), tropical('0')],
    expected: invalid('0.00'),
    name: `${ValidatorName.sumEqualTo}: all zero values are invalid`,
    rows,
  },
  // There is no tolerance on either side of 100
  {
    cell,
    data: [boreal('25'), temperate('25'), subtropical('25'), tropical('24.9')],
    expected: invalid('99.90'),
    name: `${ValidatorName.sumEqualTo}: sum below 100 is invalid`,
    rows,
  },
  {
    cell,
    data: [boreal('25'), temperate('25'), subtropical('25'), tropical('25.1')],
    expected: invalid('100.10'),
    name: `${ValidatorName.sumEqualTo}: sum above 100 is invalid`,
    rows,
  },
]
