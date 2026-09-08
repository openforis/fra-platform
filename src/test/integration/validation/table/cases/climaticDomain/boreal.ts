import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.climaticDomain
const colName = 'percentOfForestArea2015'
const cell = { colName, tableName, variableName: 'boreal' }

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

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

export const boreal: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: empty data is valid`,
  },
  // Each missing category skips the validation, even when the other values do not sum to 100
  {
    cell,
    data: [datum('temperate', '25'), datum('sub_tropical', '25'), datum('tropical', '25')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: empty boreal is valid`,
  },
  {
    cell,
    data: [datum('boreal', '25'), datum('sub_tropical', '25'), datum('tropical', '25')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: empty temperate is valid`,
  },
  {
    cell,
    data: [datum('boreal', '25'), datum('temperate', '25'), datum('tropical', '25')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: empty subtropical is valid`,
  },
  {
    cell,
    data: [datum('boreal', '25'), datum('temperate', '25'), datum('sub_tropical', '25')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: empty tropical is valid`,
  },
  // Fully reported percentages must sum to exactly 100
  {
    cell,
    data: [datum('boreal', '25'), datum('temperate', '25'), datum('sub_tropical', '25'), datum('tropical', '25')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: sum of 100 is valid`,
  },
  {
    cell,
    data: [datum('boreal', '0.1'), datum('temperate', '0.2'), datum('sub_tropical', '0.3'), datum('tropical', '99.4')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: decimal sum of 100 is valid`,
  },
  {
    cell,
    data: [datum('boreal', '0'), datum('temperate', '100'), datum('sub_tropical', '0'), datum('tropical', '0')],
    expected: undefined,
    name: `${ValidatorName.sumEqualTo}: zero categories with sum of 100 are valid`,
  },
  // Reported zeroes count as values, so an all-zero total is invalid
  {
    cell,
    data: [datum('boreal', '0'), datum('temperate', '0'), datum('sub_tropical', '0'), datum('tropical', '0')],
    expected: invalid('0.00'),
    name: `${ValidatorName.sumEqualTo}: all zero values are invalid`,
  },
  // There is no tolerance on either side of 100
  {
    cell,
    data: [datum('boreal', '25'), datum('temperate', '25'), datum('sub_tropical', '25'), datum('tropical', '24.9')],
    expected: invalid('99.90'),
    name: `${ValidatorName.sumEqualTo}: sum below 100 is invalid`,
  },
  {
    cell,
    data: [datum('boreal', '25'), datum('temperate', '25'), datum('sub_tropical', '25'), datum('tropical', '25.1')],
    expected: invalid('100.10'),
    name: `${ValidatorName.sumEqualTo}: sum above 100 is invalid`,
  },
]
