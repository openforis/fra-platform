import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

type Props = {
  variableName: VariableName
}

const tableName = TableNames.otherLandWithTreeCover
const colName = '1990'
const categories: Array<VariableName> = ['palms', 'tree_orchards', 'agroforestry', 'trees_in_urban_settings', 'other']

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const data = (raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(category, raws[index]))

const otherLand = (raw: string): NodeUpdate => ({
  colName,
  tableName: TableNames.extentOfForest,
  value: { raw },
  variableName: 'otherLand',
})

const exceedsOtherLand = {
  messages: [{ key: 'generalValidation.remainingLandExceedsExtentOfForest', name: ValidatorName.subCategory }],
  valid: false,
}

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildCases = (props: Props): Array<TableValidationTestCase> => {
  const { variableName } = props
  const cell = { colName, tableName, variableName }
  const subCategory = `${ValidatorName.subCategory} (${variableName})`

  return [
    // Nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${subCategory}: empty data is valid`,
    },
    // Nothing reported in 1e is valid regardless of any 1a issues
    {
      cell,
      data: [otherLand('-100')],
      expected: undefined,
      name: `${subCategory}: empty other land with tree cover is valid`,
    },
    // An empty cell is still invalid when the other categories already exceed the other land
    {
      cell,
      data: [
        otherLand('5000'),
        ...categories.map((category) => datum(category, category === variableName ? '' : '2000')),
      ],
      expected: exceedsOtherLand,
      name: `${subCategory}: empty ${variableName} with the other categories over the other land is invalid`,
    },
    // Empty other land skips the validation
    {
      cell,
      data: data(['1000', '1000', '1000', '1000', '1000']),
      expected: undefined,
      name: `${subCategory}: empty other land is valid`,
    },
    // Only the reported categories are summed
    {
      cell,
      data: [otherLand('5000'), datum(variableName, '1000')],
      expected: undefined,
      name: `${subCategory}: only ${variableName} within the other land is valid`,
    },
    {
      cell,
      data: [otherLand('5000'), ...data(['1000', '1000', '1000', '1000', '1000'])],
      expected: undefined,
      name: `${subCategory}: sum equal to the other land is valid`,
    },
    // The check allows one unit of tolerance
    {
      cell,
      data: [
        otherLand('5000'),
        ...categories.map((category) => datum(category, category === variableName ? '1001' : '1000')),
      ],
      expected: undefined,
      name: `${subCategory}: sum one unit over the other land is valid`,
    },
    {
      cell,
      data: [
        otherLand('5000'),
        ...categories.map((category) => datum(category, category === variableName ? '1002' : '1000')),
      ],
      expected: exceedsOtherLand,
      name: `${subCategory}: sum over the other land is invalid`,
    },
    // A reported 0 counts as a value, so it is checked against a negative other land
    {
      cell,
      data: [otherLand('-100'), datum(variableName, '0')],
      expected: exceedsOtherLand,
      name: `${subCategory}: ${variableName} of 0 with a negative other land is invalid`,
    },
  ]
}
