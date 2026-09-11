import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.primaryForestByClimaticDomain
const colName = '1990'
const cell = { colName, tableName, variableName: 'totalPrimaryForest' }
const climaticDomains: Array<VariableName> = [
  'primaryForestBoreal',
  'primaryForestTemperate',
  'primaryForestSubTropical',
  'primaryForestTropical',
]

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const data = (raws: Array<string>): Array<NodeUpdate> =>
  climaticDomains.map((climaticDomain, index) => datum(climaticDomain, raws[index]))

const primaryForest = (raw: string): NodeUpdate => ({
  colName,
  tableName: TableNames.forestCharacteristics,
  value: { raw },
  variableName: 'primaryForest',
})

const differentFromPrimaryForest = (
  parentValue: number,
  categoriesSum: number
): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.sumSubCategoriesNotEqualToParent',
      name: ValidatorName.sumSubCategoriesNotEqualToParent,
      params: {
        categoriesSum: Numbers.format(categoriesSum),
        categoryLabelKeys: [
          'fra.primaryForestByClimaticDomain.primaryForestBoreal',
          'fra.primaryForestByClimaticDomain.primaryForestTemperate',
          'fra.primaryForestByClimaticDomain.primaryForestSubTropical',
          'fra.primaryForestByClimaticDomain.primaryForestTropical',
        ],
        parentLabelKey: 'fra.forestCharacteristics.primaryForest',
        parentTableAnchor: '1b',
        parentValue: Numbers.format(parentValue),
      },
    },
  ],
  valid: false,
})

export const totalPrimaryForest: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty data is valid`,
  },
  // Empty forest characteristics skips the validation
  {
    cell,
    data: data(['100', '100', '100', '100']),
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty primary forest is valid`,
  },
  // Empty climatic domains skip the validation
  {
    cell,
    data: [primaryForest('400')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty primary forest by climatic domain is valid`,
  },
  // Each missing climatic domain skips the validation, even when the other values do not sum to the primary forest
  {
    cell,
    data: [primaryForest('400'), ...data(['', '100', '100', '100'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty primaryForestBoreal is valid`,
  },
  {
    cell,
    data: [primaryForest('400'), ...data(['100', '', '100', '100'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty primaryForestTemperate is valid`,
  },
  {
    cell,
    data: [primaryForest('400'), ...data(['100', '100', '', '100'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty primaryForestSubTropical is valid`,
  },
  {
    cell,
    data: [primaryForest('400'), ...data(['100', '100', '100', ''])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty primaryForestTropical is valid`,
  },
  {
    cell,
    data: [primaryForest('400'), ...data(['100', '100', '100', '100'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum equal to the primary forest is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [primaryForest('400'), ...data(['101', '100', '100', '100'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum one unit over the primary forest is valid`,
  },
  // A sum over or below the primary forest is invalid
  {
    cell,
    data: [primaryForest('400'), ...data(['102', '100', '100', '100'])],
    expected: differentFromPrimaryForest(400, 402),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum over the primary forest is invalid`,
  },
  {
    cell,
    data: [primaryForest('400'), ...data(['90', '100', '100', '100'])],
    expected: differentFromPrimaryForest(400, 390),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum below the primary forest is invalid`,
  },
  // A primary forest of 0 counts as a value
  {
    cell,
    data: [primaryForest('0'), ...data(['0', '0', '0', '2'])],
    expected: differentFromPrimaryForest(0, 2),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum over a primary forest of 0 is invalid`,
  },
]
