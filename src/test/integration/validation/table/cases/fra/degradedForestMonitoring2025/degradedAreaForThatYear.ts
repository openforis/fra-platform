import { ColName } from 'meta/assessment/col'
import { TableNames } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = TableNames.degradedForestMonitoring2025
const variableName = 'degradedAreaForThatYear'
const cell = { colName: variableName, tableName, variableName }

const datum = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })
// The formula compares with the maximum forest area over all the years, not with one column
const forestArea = (raw: string, col: ColName): NodeUpdate => ({
  colName: col,
  tableName: TableNames.extentOfForest,
  value: { raw },
  variableName: 'forestArea',
})

const exceedsMaxForest = {
  messages: [
    {
      key: 'generalValidation.valueCannotExceedMaximumValueReportedForForestArea',
      name: ValidatorName.notGreaterThanMaxForest,
      params: { maxForestArea: '22409.00' },
    },
  ],
  valid: false,
}

export const degradedAreaForThatYear: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanMaxForest}: empty data is valid`,
  },
  // Without any forest area the maximum can't be checked
  {
    cell,
    data: [datum('1000')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanMaxForest}: empty extent of forest is valid`,
  },
  {
    cell,
    data: [forestArea('22409', '1990')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanMaxForest}: empty degraded area is valid`,
  },
  // The maximum is taken across the years, here the later year is the larger one
  {
    cell,
    data: [forestArea('21000', '1990'), forestArea('22409', '2020'), datum('22409')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanMaxForest}: degraded area equal to the maximum forest area is valid`,
  },
  // The check allows one unit of tolerance
  {
    cell,
    data: [forestArea('22409', '1990'), forestArea('22000', '2020'), datum('22410')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanMaxForest}: degraded area one unit over the maximum forest area is valid`,
  },
  {
    cell,
    data: [forestArea('22409', '1990'), forestArea('22000', '2020'), datum('22411')],
    expected: exceedsMaxForest,
    name: `${ValidatorName.notGreaterThanMaxForest}: degraded area over the maximum forest area is invalid`,
  },
]
