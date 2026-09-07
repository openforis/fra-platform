import { TableNames } from 'meta/assessment/table'
import { Years } from 'meta/assessment/years'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { cycle } from '../setup/assessment'
import { TableValidationTestCase } from '../types'

const [colName] = Years.fraYears(cycle)
const cell = { colName, tableName: TableNames.forestCharacteristics, variableName: 'totalForestArea' }

// Formula copied from the fra 2025 metadata row forestCharacteristics.totalForestArea
const rows: TableValidationTestCase['rows'] = [
  { cols: [{ colName }], tableName: TableNames.extentOfForest, variableName: 'forestArea' },
  {
    cols: [{ colName }],
    tableName: TableNames.forestCharacteristics,
    validateFns: ['validatorTotalForest(extentOfForest.forestArea, forestCharacteristics.totalForestArea)'],
    variableName: 'totalForestArea',
  },
]

const forestArea = (raw: string): NodeUpdate => ({
  colName,
  tableName: TableNames.extentOfForest,
  value: { raw },
  variableName: 'forestArea',
})
const totalForestArea = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })

const invalid = {
  messages: [{ key: 'generalValidation.forestAreaDoesNotMatchExtentOfForest', name: ValidatorName.totalForest }],
  valid: false,
}

export const validatorTotalForest: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.totalForest}: empty data is valid`,
    rows,
  },
  // Empty extent of forest skips the validation
  {
    cell,
    data: [totalForestArea('22409')],
    expected: undefined,
    name: `${ValidatorName.totalForest}: empty extent of forest is valid`,
    rows,
  },
  // Empty forest characteristics skips the validation
  {
    cell,
    data: [forestArea('22409')],
    expected: undefined,
    name: `${ValidatorName.totalForest}: empty forest characteristics is valid`,
    rows,
  },
  // Equal areas are valid
  {
    cell,
    data: [forestArea('22409'), totalForestArea('22409')],
    expected: undefined,
    name: `${ValidatorName.totalForest}: equal areas are valid`,
    rows,
  },
  // Areas within one unit of each other are valid
  {
    cell,
    data: [forestArea('22409'), totalForestArea('22409.5')],
    expected: undefined,
    name: `${ValidatorName.totalForest}: difference below one is valid`,
    rows,
  },
  // A difference of one unit or more does not match the extent of forest
  {
    cell,
    data: [forestArea('22409'), totalForestArea('22410')],
    expected: invalid,
    name: `${ValidatorName.totalForest}: difference of one is invalid`,
    rows,
  },
]
