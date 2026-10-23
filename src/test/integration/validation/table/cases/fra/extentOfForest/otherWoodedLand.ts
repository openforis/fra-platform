import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = TableNames.extentOfForest
const colName = '1990'
const cell = { colName, tableName, variableName: 'otherWoodedLand' }

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const exceedsTotalLandArea = { key: 'extentOfForest.fedAreasExceedTotalLandArea', name: ValidatorName.otherLand }
const negative = { key: 'generalValidation.valueMustBePositive', name: ValidatorName.greaterThanOrZero }

export const otherWoodedLand: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.otherLand}: empty data is valid`,
  },
  // The other land validation reads other land and total land area, not the other wooded land
  {
    cell,
    data: [datum('otherLand', '100'), datum('totalLandArea', '30000')],
    expected: undefined,
    name: `${ValidatorName.otherLand}: empty other wooded land is valid`,
  },
  // Empty other land skips the validation
  {
    cell,
    data: [datum('otherWoodedLand', '100'), datum('totalLandArea', '30000')],
    expected: undefined,
    name: `${ValidatorName.otherLand}: empty other land is valid`,
  },
  // Empty total land area skips the validation
  {
    cell,
    data: [datum('otherWoodedLand', '100'), datum('otherLand', '-100')],
    expected: undefined,
    name: `${ValidatorName.otherLand}: empty total land area is valid`,
  },
  {
    cell,
    data: [datum('otherWoodedLand', '100'), datum('otherLand', '100'), datum('totalLandArea', '30000')],
    expected: undefined,
    name: `${ValidatorName.otherLand}: non negative other land is valid`,
  },
  // Negative other land means the reported areas exceed the total land area, so the other wooded land is flagged too
  {
    cell,
    data: [datum('otherWoodedLand', '100'), datum('otherLand', '-100'), datum('totalLandArea', '30000')],
    expected: { messages: [exceedsTotalLandArea], valid: false },
    name: `${ValidatorName.otherLand}: negative other land is invalid`,
  },
  // Zero is included in the valid range
  {
    cell,
    data: [datum('otherWoodedLand', '0')],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: zero is valid`,
  },
  {
    cell,
    data: [datum('otherWoodedLand', '-100')],
    expected: { messages: [negative], valid: false },
    name: `${ValidatorName.greaterThanOrZero}: negative other wooded land is invalid`,
  },
  // Both formulas fail and their messages are merged
  {
    cell,
    data: [datum('otherWoodedLand', '-100'), datum('otherLand', '-100'), datum('totalLandArea', '30000')],
    expected: { messages: [exceedsTotalLandArea, negative], valid: false },
    name: `${ValidatorName.greaterThanOrZero}: negative other wooded land and other land fail both`,
  },
]
