import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.growingStockTotal
const colName = '1990'
const variableName = 'forest'
const cell = { colName, tableName, variableName }

const datum = (name: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName: name,
})

const notEqualToForest = {
  messages: [{ key: 'generalValidation.mustBeEqualToForestArea', name: ValidatorName.equalToTotalForest }],
  valid: false,
}

export const forest: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToTotalForest}: empty data is valid`,
  },
  // Empty forest skips the validation
  {
    cell,
    data: [datum('naturallyRegeneratingForest', '600'), datum('plantedForest', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToTotalForest}: empty forest is valid`,
  },
  // Each missing sub category skips the validation
  {
    cell,
    data: [datum(variableName, '1000'), datum('plantedForest', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToTotalForest}: empty naturally regenerating forest is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), datum('naturallyRegeneratingForest', '600')],
    expected: undefined,
    name: `${ValidatorName.equalToTotalForest}: empty planted forest is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), datum('naturallyRegeneratingForest', '600'), datum('plantedForest', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToTotalForest}: sub categories equal to the forest are valid`,
  },
  // The check allows one unit of tolerance
  {
    cell,
    data: [datum(variableName, '1000'), datum('naturallyRegeneratingForest', '601'), datum('plantedForest', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToTotalForest}: sub categories one unit over the forest are valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), datum('naturallyRegeneratingForest', '602'), datum('plantedForest', '400')],
    expected: notEqualToForest,
    name: `${ValidatorName.equalToTotalForest}: sub categories over the forest are invalid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), datum('naturallyRegeneratingForest', '598'), datum('plantedForest', '400')],
    expected: notEqualToForest,
    name: `${ValidatorName.equalToTotalForest}: sub categories below the forest are invalid`,
  },
  // A sub category of 0 counts as reported, so the sum is checked instead of skipped
  {
    cell,
    data: [datum(variableName, '1000'), datum('naturallyRegeneratingForest', '600'), datum('plantedForest', '0')],
    expected: notEqualToForest,
    name: `${ValidatorName.equalToTotalForest}: sub category of 0 with the sum below the forest is invalid`,
  },
]
