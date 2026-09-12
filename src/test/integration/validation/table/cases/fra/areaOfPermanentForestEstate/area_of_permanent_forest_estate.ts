import { TableNames } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = TableNames.areaOfPermanentForestEstate
const colName = '1990'
const variableName = 'area_of_permanent_forest_estate'
const cell = { colName, tableName, variableName }

const datum = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })
const forestArea = (raw: string): NodeUpdate => ({
  colName,
  tableName: TableNames.extentOfForest,
  value: { raw },
  variableName: 'forestArea',
})

const exceedsForest = {
  messages: [
    {
      key: 'generalValidation.forestAreaExceedsExtentOfForest',
      name: ValidatorName.notGreaterThanForest,
      params: { value: '22409.00' },
    },
  ],
  valid: false,
}

export const areaOfPermanentForestEstate: Array<TableValidationTestCase> = [
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
  // Empty permanent forest estate skips the validation
  {
    cell,
    data: [forestArea('22409')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForest}: empty permanent forest estate is valid`,
  },
  {
    cell,
    data: [forestArea('22409'), datum('22000')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForest}: estate within the forest area is valid`,
  },
  // The check allows one unit of tolerance
  {
    cell,
    data: [forestArea('22409'), datum('22410')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForest}: estate one unit over the forest area is valid`,
  },
  {
    cell,
    data: [forestArea('22409'), datum('22411')],
    expected: exceedsForest,
    name: `${ValidatorName.notGreaterThanForest}: estate over the forest area is invalid`,
  },
]
