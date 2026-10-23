import { NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

type Props = {
  variableName: VariableName
}

const tableName = TableNames.climaticDomain
const colName = 'percentOfForestArea2015'
const categories: Array<VariableName> = ['boreal', 'temperate', 'sub_tropical', 'tropical']

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})
const data = (raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(category, raws[index]))

const notGreaterThanMessage = {
  key: 'generalValidation.valueNotGreaterThan',
  name: ValidatorName.notGreaterThan,
  params: { maxValue: 100 },
}
const sumEqualToMessage = (categoriesSum: string): NodeValueValidationMessage => ({
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
})

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildCases = (props: Props): Array<TableValidationTestCase> => {
  const { variableName } = props
  const cell = { colName, tableName, variableName }
  const sumEqualTo = `${ValidatorName.sumEqualTo} (${variableName})`
  const notGreaterThan = `${ValidatorName.notGreaterThan} (${variableName})`

  // Each missing category skips the sum validation, even when the other values do not sum to 100
  const emptyCategoryCases = categories.map<TableValidationTestCase>((emptyCategory) => ({
    cell,
    data: categories.filter((category) => category !== emptyCategory).map((category) => datum(category, '25')),
    expected: undefined,
    name: `${sumEqualTo}: empty ${emptyCategory} is valid`,
  }))

  return [
    // Nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${sumEqualTo}: empty data is valid`,
    },
    ...emptyCategoryCases,
    // Fully reported percentages must sum to exactly 100
    {
      cell,
      data: data(['25', '25', '25', '25']),
      expected: undefined,
      name: `${sumEqualTo}: sum of 100 is valid`,
    },
    {
      cell,
      data: data(['0.1', '0.2', '0.3', '99.4']),
      expected: undefined,
      name: `${sumEqualTo}: decimal sum of 100 is valid`,
    },
    // Reported zeroes count as values, so an all-zero total is invalid
    {
      cell,
      data: data(['0', '0', '0', '0']),
      expected: { messages: [sumEqualToMessage('0.00')], valid: false },
      name: `${sumEqualTo}: all zero values are invalid`,
    },
    // There is no tolerance on either side of 100
    {
      cell,
      data: data(['25', '25', '25', '24.9']),
      expected: { messages: [sumEqualToMessage('99.90')], valid: false },
      name: `${sumEqualTo}: sum below 100 is invalid`,
    },
    {
      cell,
      data: data(['25', '25', '25', '25.1']),
      expected: { messages: [sumEqualToMessage('100.10')], valid: false },
      name: `${sumEqualTo}: sum above 100 is invalid`,
    },
    // A category can take the whole 100, the sum stays valid
    {
      cell,
      data: categories.map((category) => datum(category, category === variableName ? '100' : '0')),
      expected: undefined,
      name: `${notGreaterThan}: 100 is valid`,
    },
    // With the other categories empty the sum is skipped, so only the maximum check fails
    {
      cell,
      data: [datum(variableName, '100.1')],
      expected: { messages: [notGreaterThanMessage], valid: false },
      name: `${notGreaterThan}: over 100 is invalid`,
    },
    // Both formulas fail and their messages are merged
    {
      cell,
      data: categories.map((category) => datum(category, category === variableName ? '100.1' : '0')),
      expected: { messages: [notGreaterThanMessage, sumEqualToMessage('100.10')], valid: false },
      name: `${notGreaterThan}: over 100 also breaks the sum`,
    },
  ]
}
