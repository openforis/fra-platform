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

const tableName = TableNames.specificForestCategories
const colName = '1990'
const categories: Array<VariableName> = ['bamboo', 'mangroves', 'rubber_wood']

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const data = (raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(category, raws[index]))

const forestArea = (raw: string): NodeUpdate => ({
  colName,
  tableName: TableNames.extentOfForest,
  value: { raw },
  variableName: 'forestArea',
})

const exceedsForest = (value: string): NodeValueValidationMessage => ({
  key: 'generalValidation.forestAreaExceedsExtentOfForest',
  name: ValidatorName.notGreaterThanForest,
  params: { value },
})

const sumExceedsForest = (parentValue: number, categoriesSum: number): NodeValueValidationMessage => ({
  key: 'generalValidation.sumSubCategoriesExceedParent',
  name: ValidatorName.sumSubCategoriesNotGreaterThanParent,
  params: {
    categoriesSum: Numbers.format(categoriesSum),
    categoryLabelKeys: [
      'specificForestCategories.bamboo',
      'specificForestCategories.mangroves',
      'specificForestCategories.rubberWood',
    ],
    parentLabelKey: 'extentOfForest.forestArea',
    parentTableAnchor: '1a',
    parentValue: Numbers.format(parentValue),
  },
})

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildCases = (props: Props): Array<TableValidationTestCase> => {
  const { variableName } = props
  const cell = { colName, tableName, variableName }
  const notGreaterThanForest = `${ValidatorName.notGreaterThanForest} (${variableName})`
  const sumNotGreaterThanForest = `${ValidatorName.sumSubCategoriesNotGreaterThanParent} (${variableName})`

  return [
    // Nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${notGreaterThanForest}: empty data is valid`,
    },
    // Empty extent of forest skips both validations
    {
      cell,
      data: [datum(variableName, '22000')],
      expected: undefined,
      name: `${notGreaterThanForest}: empty extent of forest is valid`,
    },
    {
      cell,
      data: [forestArea('22409')],
      expected: undefined,
      name: `${notGreaterThanForest}: empty ${variableName} is valid`,
    },
    {
      cell,
      data: [forestArea('22409'), datum(variableName, '300')],
      expected: undefined,
      name: `${notGreaterThanForest}: within the forest area is valid`,
    },
    // Empty categories count as 0 in the sum, so both validations allow one unit over the forest area
    {
      cell,
      data: [forestArea('22409'), datum(variableName, '22410')],
      expected: undefined,
      name: `${notGreaterThanForest}: one unit over the forest area is valid`,
    },
    // Over the forest area, both the category and the sum fail, so we get both messages
    {
      cell,
      data: [forestArea('22409'), datum(variableName, '22411')],
      expected: { messages: [exceedsForest('22409.00'), sumExceedsForest(22409, 22411)], valid: false },
      name: `${notGreaterThanForest}: over the forest area is invalid`,
    },
    // A forest area of 0 counts as a value
    {
      cell,
      data: [forestArea('0'), datum(variableName, '2')],
      expected: { messages: [exceedsForest('0.00'), sumExceedsForest(0, 2)], valid: false },
      name: `${notGreaterThanForest}: over a forest area of 0 is invalid`,
    },
    // An empty cell is still valid when the other categories already exceed the forest area
    {
      cell,
      data: [
        forestArea('22409'),
        ...categories.map((category) => datum(category, category === variableName ? '' : '22000')),
      ],
      expected: undefined,
      name: `${sumNotGreaterThanForest}: empty ${variableName} with the other categories over the forest area is valid`,
    },
    // A reported 0 counts as a value, so the sum is checked
    {
      cell,
      data: [
        forestArea('22409'),
        ...categories.map((category) => datum(category, category === variableName ? '0' : '11206')),
      ],
      expected: { messages: [sumExceedsForest(22409, 22412)], valid: false },
      name: `${sumNotGreaterThanForest}: ${variableName} of 0 with the other categories over the forest area is invalid`,
    },
    {
      cell,
      data: [forestArea('22409'), ...data(['7409', '7500', '7500'])],
      expected: undefined,
      name: `${sumNotGreaterThanForest}: sum equal to the forest area is valid`,
    },
    // The sum allows one unit of tolerance
    {
      cell,
      data: [forestArea('22409'), ...data(['7410', '7500', '7500'])],
      expected: undefined,
      name: `${sumNotGreaterThanForest}: sum one unit over the forest area is valid`,
    },
    // Each category is within the forest area, only the sum is over it
    {
      cell,
      data: [forestArea('22409'), ...data(['7411', '7500', '7500'])],
      expected: { messages: [sumExceedsForest(22409, 22411)], valid: false },
      name: `${sumNotGreaterThanForest}: sum over the forest area is invalid`,
    },
  ]
}
