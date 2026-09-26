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

const tableName = TableNames.forestAreaChange
const colName = '1990-2000'
const expansions: Array<VariableName> = ['afforestation', 'natural_expansion']

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const exceedsParent: NodeValueValidationMessage = {
  key: 'generalValidation.subCategoryExceedsParent',
  name: ValidatorName.subCategory,
}

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildExpansionCases = (props: Props): Array<TableValidationTestCase> => {
  const { parentLabelParams, variableName } = props
  const cell = { colName, tableName, variableName }
  const otherExpansion = expansions.find((expansion) => expansion !== variableName)
  const sumNotEqualToParent = `${ValidatorName.sumSubCategoriesNotEqualToParent} (${variableName})`
  const subCategory = `${ValidatorName.subCategory} (${variableName})`

  const differentFromParent = (parentValue: number, categoriesSum: number): NodeValueValidationMessage => ({
    key: 'generalValidation.sumSubCategoriesNotEqualToParent',
    name: ValidatorName.sumSubCategoriesNotEqualToParent,
    params: {
      categoriesSum: Numbers.format(categoriesSum),
      categoryLabelKeys: ['forestAreaChange.ofWhichAfforestation', 'forestAreaChange.ofWhichNaturalExpansion'],
      parentLabelKey: 'fra.forestAreaChange.forestExpansion2025',
      parentLabelParams,
      parentTableAnchor: '1d',
      parentValue: Numbers.format(parentValue),
    },
  })

  return [
    // Nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${sumNotEqualToParent}: empty data is valid`,
    },
    // Empty forest expansion skips both validations
    {
      cell,
      data: [datum(variableName, '100'), datum(otherExpansion, '100')],
      expected: undefined,
      name: `${sumNotEqualToParent}: empty forest expansion is valid`,
    },
    // Each missing expansion skips the sum validation
    {
      cell,
      data: [datum('forest_expansion', '200'), datum(variableName, '100')],
      expected: undefined,
      name: `${sumNotEqualToParent}: empty ${otherExpansion} is valid`,
    },
    {
      cell,
      data: [datum('forest_expansion', '200'), datum(otherExpansion, '100')],
      expected: undefined,
      name: `${sumNotEqualToParent}: empty ${variableName} is valid`,
    },
    {
      cell,
      data: [datum('forest_expansion', '200'), datum(variableName, '100'), datum(otherExpansion, '100')],
      expected: undefined,
      name: `${sumNotEqualToParent}: sum equal to the forest expansion is valid`,
    },
    // The sum allows one unit of tolerance
    {
      cell,
      data: [datum('forest_expansion', '200'), datum(variableName, '101'), datum(otherExpansion, '100')],
      expected: undefined,
      name: `${sumNotEqualToParent}: sum one unit over the forest expansion is valid`,
    },
    // A sum over or below the forest expansion is invalid
    {
      cell,
      data: [datum('forest_expansion', '200'), datum(variableName, '102'), datum(otherExpansion, '100')],
      expected: { messages: [differentFromParent(200, 202)], valid: false },
      name: `${sumNotEqualToParent}: sum over the forest expansion is invalid`,
    },
    {
      cell,
      data: [datum('forest_expansion', '200'), datum(variableName, '90'), datum(otherExpansion, '100')],
      expected: { messages: [differentFromParent(200, 190)], valid: false },
      name: `${sumNotEqualToParent}: sum below the forest expansion is invalid`,
    },
    // The sub category check allows one unit of tolerance
    {
      cell,
      data: [datum('forest_expansion', '100'), datum(variableName, '101'), datum(otherExpansion, '0')],
      expected: undefined,
      name: `${subCategory}: one unit over the forest expansion is valid`,
    },
    // Over the forest expansion, both the sum and the sub category fail, so we get both messages
    {
      cell,
      data: [datum('forest_expansion', '100'), datum(variableName, '102'), datum(otherExpansion, '0')],
      expected: { messages: [differentFromParent(100, 102), exceedsParent], valid: false },
      name: `${subCategory}: over the forest expansion is invalid`,
    },
  ]
}
