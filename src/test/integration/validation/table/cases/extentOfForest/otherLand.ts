import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.extentOfForest
const colName = '1990'
const cell = { colName, tableName, variableName: 'otherLand' }

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

export const otherLand: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.otherLand}: empty data is valid`,
  },
  // Empty other land skips the validation
  {
    cell,
    data: [datum('totalLandArea', '30000')],
    expected: undefined,
    name: `${ValidatorName.otherLand}: empty other land is valid`,
  },
  // Empty total land area skips the validation
  {
    cell,
    data: [datum('otherLand', '-100')],
    expected: undefined,
    name: `${ValidatorName.otherLand}: empty total land area is valid`,
  },
  // Other land within the total land area is valid
  {
    cell,
    data: [datum('otherLand', '100'), datum('totalLandArea', '30000')],
    expected: undefined,
    name: `${ValidatorName.otherLand}: non negative other land is valid`,
  },
  // Negative other land means the reported areas exceed the total land area
  {
    cell,
    data: [datum('otherLand', '-100'), datum('totalLandArea', '30000')],
    expected: {
      messages: [{ key: 'extentOfForest.fedAreasExceedTotalLandArea', name: ValidatorName.otherLand }],
      valid: false,
    },
    name: `${ValidatorName.otherLand}: negative other land is invalid`,
  },
]
