import { NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'

import { TableValidationTestCase } from '../../../types'

type Props = {
  variableName: VariableName
}

const tableName = TableNames.growingStockTotal
const colName = '1990'
const categories: Array<VariableName> = ['naturallyRegeneratingForest', 'plantedForest']

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const data = (raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(category, raws[index]))

const exceedsForest = (parentValue: number, categoriesSum: number): NodeValueValidationMessage => ({
  key: 'generalValidation.sumSubCategoriesExceedParent',
  name: ValidatorName.sumSubCategoriesNotGreaterThanParent,
  params: {
    categoriesSum: Numbers.format(categoriesSum),
    categoryLabelKeys: ['growingStock.naturallyRegeneratingForest', 'growingStock.plantedForest'],
    parentLabelKey: 'fra.growingStock.totalForest',
    parentTableAnchor: '2a',
    parentValue: Numbers.format(parentValue),
  },
})

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildForestCategoryCases = (props: Props): Array<TableValidationTestCase> => {
  const { variableName } = props
  const cell = { colName, tableName, variableName }
  const sumNotGreaterThanForest = `${ValidatorName.sumSubCategoriesNotGreaterThanParent} (${variableName})`

  return [
    // Nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${sumNotGreaterThanForest}: empty data is valid`,
    },
    // Empty forest skips the validation
    {
      cell,
      data: data(['600', '400']),
      expected: undefined,
      name: `${sumNotGreaterThanForest}: empty forest is valid`,
    },
    // Only the cell under test being empty skips the validation, the other category is summed as it is
    {
      cell,
      data: [
        datum('forest', '1000'),
        ...categories.map((category) => datum(category, category === variableName ? '' : '2000')),
      ],
      expected: undefined,
      name: `${sumNotGreaterThanForest}: empty ${variableName} is valid`,
    },
    // A cell of 0 counts as reported, so the sum is checked instead of skipped
    {
      cell,
      data: [
        datum('forest', '1000'),
        ...categories.map((category) => datum(category, category === variableName ? '0' : '1002')),
      ],
      expected: { messages: [exceedsForest(1000, 1002)], valid: false },
      name: `${sumNotGreaterThanForest}: ${variableName} of 0 with the other category over the forest is invalid`,
    },
    {
      cell,
      data: [datum('forest', '1000'), datum(variableName, '400')],
      expected: undefined,
      name: `${sumNotGreaterThanForest}: alone within the forest is valid`,
    },
    {
      cell,
      data: [datum('forest', '1000'), datum(variableName, '1002')],
      expected: { messages: [exceedsForest(1000, 1002)], valid: false },
      name: `${sumNotGreaterThanForest}: alone over the forest is invalid`,
    },
    {
      cell,
      data: [datum('forest', '1000'), ...data(['600', '400'])],
      expected: undefined,
      name: `${sumNotGreaterThanForest}: sum equal to the forest is valid`,
    },
    // The sum allows one unit of tolerance
    {
      cell,
      data: [datum('forest', '1000'), ...data(['601', '400'])],
      expected: undefined,
      name: `${sumNotGreaterThanForest}: sum one unit over the forest is valid`,
    },
    {
      cell,
      data: [datum('forest', '1000'), ...data(['602', '400'])],
      expected: { messages: [exceedsForest(1000, 1002)], valid: false },
      name: `${sumNotGreaterThanForest}: sum over the forest is invalid`,
    },
    // A forest of 0 counts as a value
    {
      cell,
      data: [datum('forest', '0'), datum(variableName, '2')],
      expected: { messages: [exceedsForest(0, 2)], valid: false },
      name: `${sumNotGreaterThanForest}: over a forest of 0 is invalid`,
    },
  ]
}
