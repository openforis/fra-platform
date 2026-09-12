import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = TableNames.forestAreaWithinProtectedAreas
const colName = '1990'
const variableName = 'of_which_in_protected_areas'
const cell = { colName, tableName, variableName }

const datum = (name: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName: name,
})

const exceedsParent = {
  messages: [{ key: 'generalValidation.subCategoryExceedsParent', name: ValidatorName.subCategory }],
  valid: false,
}

export const ofWhichInProtectedAreas: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.subCategory}: empty data is valid`,
  },
  // Empty forest area with long term management plan skips the validation
  {
    cell,
    data: [datum(variableName, '100')],
    expected: undefined,
    name: `${ValidatorName.subCategory}: empty forest area with long term management plan is valid`,
  },
  {
    cell,
    data: [datum('forest_area_with_long_term_management_plan', '1000')],
    expected: undefined,
    name: `${ValidatorName.subCategory}: empty of which in protected areas is valid`,
  },
  {
    cell,
    data: [datum('forest_area_with_long_term_management_plan', '1000'), datum(variableName, '100')],
    expected: undefined,
    name: `${ValidatorName.subCategory}: within the forest area with long term management plan is valid`,
  },
  // The check allows one unit of tolerance
  {
    cell,
    data: [datum('forest_area_with_long_term_management_plan', '1000'), datum(variableName, '1001')],
    expected: undefined,
    name: `${ValidatorName.subCategory}: one unit over the forest area with long term management plan is valid`,
  },
  {
    cell,
    data: [datum('forest_area_with_long_term_management_plan', '1000'), datum(variableName, '1001.01')],
    expected: exceedsParent,
    name: `${ValidatorName.subCategory}: over the forest area with long term management plan is invalid`,
  },
  // A forest area with long term management plan of 0 counts as a value
  {
    cell,
    data: [datum('forest_area_with_long_term_management_plan', '0'), datum(variableName, '2')],
    expected: exceedsParent,
    name: `${ValidatorName.subCategory}: over a forest area with long term management plan of 0 is invalid`,
  },
]
