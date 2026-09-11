import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

type Props = {
  variableName: VariableName
}

const tableName = TableNames.totalAreaWithDesignatedManagementObjective
const colName = '1990'

const forestArea = (raw: string): NodeUpdate => ({
  colName,
  tableName: TableNames.extentOfForest,
  value: { raw },
  variableName: 'forestArea',
})

const exceedsForest = (value: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.forestAreaExceedsExtentOfForest',
      name: ValidatorName.notGreaterThanForest,
      params: { value },
    },
  ],
  valid: false,
})

// All five rows carry the same formula, so the cases only differ by the cell under test
export const buildCases = (props: Props): Array<TableValidationTestCase> => {
  const { variableName } = props
  const cell = { colName, tableName, variableName }
  const notGreaterThanForest = `${ValidatorName.notGreaterThanForest} (${variableName})`
  const datum = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })

  return [
    // Nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${notGreaterThanForest}: empty data is valid`,
    },
    // Empty extent of forest skips the validation
    {
      cell,
      data: [datum('22000')],
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
      data: [forestArea('22409'), datum('22000')],
      expected: undefined,
      name: `${notGreaterThanForest}: within the forest area is valid`,
    },
    // The check allows one unit of tolerance
    {
      cell,
      data: [forestArea('22409'), datum('22410')],
      expected: undefined,
      name: `${notGreaterThanForest}: one unit over the forest area is valid`,
    },
    {
      cell,
      data: [forestArea('22409'), datum('22410.01')],
      expected: exceedsForest('22409.00'),
      name: `${notGreaterThanForest}: over the forest area is invalid`,
    },
    // A forest area of 0 counts as a value
    {
      cell,
      data: [forestArea('0'), datum('2')],
      expected: exceedsForest('0.00'),
      name: `${notGreaterThanForest}: over a forest area of 0 is invalid`,
    },
  ]
}
