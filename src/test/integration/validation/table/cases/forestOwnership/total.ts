import { TableNames } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.forestOwnership
const colName = '1990'
const variableName = 'total'
const cell = { colName, tableName, variableName }

const datum = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })
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

export const total: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForest}: empty data is valid`,
  },
  // Empty extent of forest skips the validation
  {
    cell,
    data: [datum('22000')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForest}: empty extent of forest is valid`,
  },
  {
    cell,
    data: [forestArea('22409')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForest}: empty total is valid`,
  },
  {
    cell,
    data: [forestArea('22409'), datum('22000')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForest}: total within the forest area is valid`,
  },
  // The check allows one unit of tolerance
  {
    cell,
    data: [forestArea('22409'), datum('22410')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForest}: total one unit over the forest area is valid`,
  },
  {
    cell,
    data: [forestArea('22409'), datum('22410.01')],
    expected: exceedsForest('22409.00'),
    name: `${ValidatorName.notGreaterThanForest}: total over the forest area is invalid`,
  },
  // A forest area of 0 counts as a value
  {
    cell,
    data: [forestArea('0'), datum('2')],
    expected: exceedsForest('0.00'),
    name: `${ValidatorName.notGreaterThanForest}: total over a forest area of 0 is invalid`,
  },
]
