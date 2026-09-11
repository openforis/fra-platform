import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.forestCharacteristics
const colName = '1990'
const variableName = 'plantationForestIntroducedArea'
const cell = { colName, tableName, variableName }

const datum = (name: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName: name,
})

const exceedsPlantation = {
  messages: [{ key: 'generalValidation.subCategoryExceedsParent', name: ValidatorName.plantationForestIntroduced }],
  valid: false,
}
const negative = {
  messages: [{ key: 'generalValidation.valueMustBePositive', name: ValidatorName.greaterThanOrZero }],
  valid: false,
}

export const plantationForestIntroducedArea: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.plantationForestIntroduced}: empty data is valid`,
  },
  // Empty plantation forest area skips the validation
  {
    cell,
    data: [datum(variableName, '100')],
    expected: undefined,
    name: `${ValidatorName.plantationForestIntroduced}: empty plantation forest area is valid`,
  },
  {
    cell,
    data: [datum('plantationForestArea', '1000')],
    expected: undefined,
    name: `${ValidatorName.plantationForestIntroduced}: empty introduced area is valid`,
  },
  {
    cell,
    data: [datum('plantationForestArea', '1000'), datum(variableName, '100')],
    expected: undefined,
    name: `${ValidatorName.plantationForestIntroduced}: within the plantation forest area is valid`,
  },
  {
    cell,
    data: [datum('plantationForestArea', '1000'), datum(variableName, '1000')],
    expected: undefined,
    name: `${ValidatorName.plantationForestIntroduced}: equal to the plantation forest area is valid`,
  },
  // The tolerance is less than one unit, so 1000.5 is valid and 1001 is invalid
  {
    cell,
    data: [datum('plantationForestArea', '1000'), datum(variableName, '1000.5')],
    expected: undefined,
    name: `${ValidatorName.plantationForestIntroduced}: half a unit over the plantation forest area is valid`,
  },
  {
    cell,
    data: [datum('plantationForestArea', '1000'), datum(variableName, '1001')],
    expected: exceedsPlantation,
    name: `${ValidatorName.plantationForestIntroduced}: one unit over the plantation forest area is invalid`,
  },
  // A plantation forest area of 0 counts as a value
  {
    cell,
    data: [datum('plantationForestArea', '0'), datum(variableName, '2')],
    expected: exceedsPlantation,
    name: `${ValidatorName.plantationForestIntroduced}: over a plantation forest area of 0 is invalid`,
  },
  // Zero is included in the valid range
  {
    cell,
    data: [datum(variableName, '0')],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: zero is valid`,
  },
  {
    cell,
    data: [datum(variableName, '-100')],
    expected: negative,
    name: `${ValidatorName.greaterThanOrZero}: negative introduced area is invalid`,
  },
]
