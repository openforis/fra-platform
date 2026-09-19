import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

type Props = {
  parentVariableName: VariableName
  variableName: VariableName
}

const tableName = TableNames.growingStockTotal
const colName = '1990'

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const exceedsParent = {
  messages: [{ key: 'generalValidation.subCategoryExceedsParent', name: ValidatorName.subCategory }],
  valid: false,
}

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildSubCategoryCases = (props: Props): Array<TableValidationTestCase> => {
  const { parentVariableName, variableName } = props
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
    // Empty parent skips the validation
    {
      cell,
      data: [datum(variableName, '100')],
      expected: undefined,
      name: `${subCategory}: empty ${parentVariableName} is valid`,
    },
    {
      cell,
      data: [datum(parentVariableName, '1000')],
      expected: undefined,
      name: `${subCategory}: empty ${variableName} is valid`,
    },
    {
      cell,
      data: [datum(parentVariableName, '1000'), datum(variableName, '100')],
      expected: undefined,
      name: `${subCategory}: within the ${parentVariableName} is valid`,
    },
    // The check allows one unit of tolerance
    {
      cell,
      data: [datum(parentVariableName, '1000'), datum(variableName, '1001')],
      expected: undefined,
      name: `${subCategory}: one unit over the ${parentVariableName} is valid`,
    },
    {
      cell,
      data: [datum(parentVariableName, '1000'), datum(variableName, '1001.01')],
      expected: exceedsParent,
      name: `${subCategory}: over the ${parentVariableName} is invalid`,
    },
    // A parent of 0 counts as a value
    {
      cell,
      data: [datum(parentVariableName, '0'), datum(variableName, '2')],
      expected: exceedsParent,
      name: `${subCategory}: over a ${parentVariableName} of 0 is invalid`,
    },
  ]
}
