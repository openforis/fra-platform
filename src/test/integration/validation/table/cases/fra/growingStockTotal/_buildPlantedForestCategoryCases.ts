import { NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'

import { TableValidationTestCase } from '../../../types'

type Props = {
  // The metadata passes a different parentLabelParams to each row
  parentLabelParams: number
  variableName: VariableName
}

const tableName = TableNames.growingStockTotal
const colName = '1990'
const categories: Array<VariableName> = ['plantationForest', 'otherPlantedForest']

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const data = (raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(category, raws[index]))

const exceedsPlantedForest: NodeValueValidationMessage = {
  key: 'generalValidation.subCategoryExceedsParent',
  name: ValidatorName.subCategory,
}

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildPlantedForestCategoryCases = (props: Props): Array<TableValidationTestCase> => {
  const { parentLabelParams, variableName } = props
  const cell = { colName, tableName, variableName }
  const sumNotEqualToPlantedForest = `${ValidatorName.sumSubCategoriesNotEqualToParent} (${variableName})`
  const subCategory = `${ValidatorName.subCategory} (${variableName})`

  const differentFromPlantedForest = (parentValue: number, categoriesSum: number): NodeValueValidationMessage => ({
    key: 'generalValidation.sumSubCategoriesNotEqualToParent',
    name: ValidatorName.sumSubCategoriesNotEqualToParent,
    params: {
      categoriesSum: Numbers.format(categoriesSum),
      categoryLabelKeys: ['growingStock.plantationForest', 'growingStock.otherPlantedForest'],
      parentLabelKey: 'growingStock.plantedForest',
      parentLabelParams,
      parentTableAnchor: '2a',
      parentValue: Numbers.format(parentValue),
    },
  })

  return [
    // Nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${sumNotEqualToPlantedForest}: empty data is valid`,
    },
    // Empty planted forest skips both validations
    {
      cell,
      data: data(['100', '100']),
      expected: undefined,
      name: `${sumNotEqualToPlantedForest}: empty planted forest is valid`,
    },
    // Each missing category skips the sum validation
    {
      cell,
      data: [datum('plantedForest', '200'), datum(variableName, '100')],
      expected: undefined,
      name: `${sumNotEqualToPlantedForest}: empty other category is valid`,
    },
    {
      cell,
      data: [
        datum('plantedForest', '200'),
        ...categories.map((category) => datum(category, category === variableName ? '' : '100')),
      ],
      expected: undefined,
      name: `${sumNotEqualToPlantedForest}: empty ${variableName} is valid`,
    },
    {
      cell,
      data: [datum('plantedForest', '200'), ...data(['100', '100'])],
      expected: undefined,
      name: `${sumNotEqualToPlantedForest}: sum equal to the planted forest is valid`,
    },
    // The sum allows one unit of tolerance
    {
      cell,
      data: [datum('plantedForest', '200'), ...data(['101', '100'])],
      expected: undefined,
      name: `${sumNotEqualToPlantedForest}: sum one unit over the planted forest is valid`,
    },
    // A sum over or below the planted forest is invalid
    {
      cell,
      data: [datum('plantedForest', '200'), ...data(['102', '100'])],
      expected: { messages: [differentFromPlantedForest(200, 202)], valid: false },
      name: `${sumNotEqualToPlantedForest}: sum over the planted forest is invalid`,
    },
    {
      cell,
      data: [datum('plantedForest', '200'), ...data(['90', '100'])],
      expected: { messages: [differentFromPlantedForest(200, 190)], valid: false },
      name: `${sumNotEqualToPlantedForest}: sum below the planted forest is invalid`,
    },
    // The sub category check allows one unit of tolerance
    {
      cell,
      data: [
        datum('plantedForest', '100'),
        ...categories.map((category) => datum(category, category === variableName ? '101' : '0')),
      ],
      expected: undefined,
      name: `${subCategory}: one unit over the planted forest is valid`,
    },
    // Over the planted forest, both the sum and the sub category fail, so we get both messages
    {
      cell,
      data: [
        datum('plantedForest', '100'),
        ...categories.map((category) => datum(category, category === variableName ? '102' : '0')),
      ],
      expected: { messages: [differentFromPlantedForest(100, 102), exceedsPlantedForest], valid: false },
      name: `${subCategory}: over the planted forest is invalid`,
    },
  ]
}
