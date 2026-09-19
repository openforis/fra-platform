import { ColName } from 'meta/assessment/col'
import { TableNames } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = TableNames.forestAreaChange
// Each column has its own formula: the forest area difference divided by the interval, 10 years for 1990-2000 and 5 for 2010-2015
const colName = '1990-2000'
const fiveYearColName = '2010-2015'
const variableName = 'forestAreaNetChange'
const cell = { colName, tableName, variableName }
const fiveYearCell = { ...cell, colName: fiveYearColName }

const datum = (raw: string, col = colName): NodeUpdate => ({ colName: col, tableName, value: { raw }, variableName })
const forestArea = (raw: string, col: ColName): NodeUpdate => ({
  colName: col,
  tableName: TableNames.extentOfForest,
  value: { raw },
  variableName: 'forestArea',
})

const doesNotMatch = (value: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'extentOfForest.forestAreaNetChangeDoesNotMatch',
      name: ValidatorName.forestAreaNetChange,
      params: { value },
    },
  ],
  valid: false,
})

export const forestAreaNetChange: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.forestAreaNetChange}: empty data is valid`,
  },
  // Empty extent of forest skips the validation
  {
    cell,
    data: [datum('40.9')],
    expected: undefined,
    name: `${ValidatorName.forestAreaNetChange}: empty extent of forest is valid`,
  },
  // With one of the two years missing the difference can't be computed
  {
    cell,
    data: [forestArea('22409', '2000'), datum('40.9')],
    expected: undefined,
    name: `${ValidatorName.forestAreaNetChange}: missing forest area year is valid`,
  },
  // Empty net change skips the validation
  {
    cell,
    data: [forestArea('22000', '1990'), forestArea('22409', '2000')],
    expected: undefined,
    name: `${ValidatorName.forestAreaNetChange}: empty net change is valid`,
  },
  // 22409 - 22000 over the 10 years of 1990-2000 is 40.9
  {
    cell,
    data: [forestArea('22000', '1990'), forestArea('22409', '2000'), datum('40.9')],
    expected: undefined,
    name: `${ValidatorName.forestAreaNetChange}: net change equal to the forest area change is valid`,
  },
  // The check allows one unit of tolerance
  {
    cell,
    data: [forestArea('22000', '1990'), forestArea('22409', '2000'), datum('41.9')],
    expected: undefined,
    name: `${ValidatorName.forestAreaNetChange}: net change one unit over the forest area change is valid`,
  },
  {
    cell,
    data: [forestArea('22000', '1990'), forestArea('22409', '2000'), datum('42')],
    expected: doesNotMatch('40.90'),
    name: `${ValidatorName.forestAreaNetChange}: net change different from the forest area change is invalid`,
  },
  // A forest loss is a negative net change
  {
    cell,
    data: [forestArea('22409', '1990'), forestArea('22000', '2000'), datum('-40.9')],
    expected: undefined,
    name: `${ValidatorName.forestAreaNetChange}: negative net change equal to the forest area loss is valid`,
  },
  // Over the 5 years of 2010-2015 the same difference is 81.8, so 40.9 is invalid
  {
    cell: fiveYearCell,
    data: [forestArea('22000', '2010'), forestArea('22409', '2015'), datum('81.8', fiveYearColName)],
    expected: undefined,
    name: `${ValidatorName.forestAreaNetChange}: net change over a 5 year interval is valid`,
  },
  {
    cell: fiveYearCell,
    data: [forestArea('22000', '2010'), forestArea('22409', '2015'), datum('40.9', fiveYearColName)],
    expected: doesNotMatch('81.80'),
    name: `${ValidatorName.forestAreaNetChange}: 10 year net change over a 5 year interval is invalid`,
  },
]
