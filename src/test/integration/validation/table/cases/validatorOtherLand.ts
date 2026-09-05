import { TableNames } from 'meta/assessment/table'
import { Years } from 'meta/assessment/years'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { cycle } from '../setup/assessment'
import { TableValidationTestCase } from '../types'

const tableName = TableNames.extentOfForest
const [colName] = Years.fraYears(cycle)
const cell = { colName, tableName, variableName: 'otherLand' }

// Formula copied from the fra 2025 metadata row extentOfForest.otherLand
const rows: TableValidationTestCase['rows'] = [
  {
    cols: [{ colName }],
    tableName,
    validateFns: ['validatorOtherLand(extentOfForest.otherLand, extentOfForest.totalLandArea)'],
    variableName: 'otherLand',
  },
  { cols: [{ colName }], tableName, variableName: 'totalLandArea' },
]

const otherLand = (raw: string): NodeUpdate => ({ colName, tableName, value: { raw }, variableName: 'otherLand' })
const totalLandArea = (raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName: 'totalLandArea',
})

export const validatorOtherLand: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.otherLand}: empty data is valid`,
    rows,
  },
  // Empty other land skips the validation
  {
    cell,
    data: [totalLandArea('30000')],
    expected: undefined,
    name: `${ValidatorName.otherLand}: empty other land is valid`,
    rows,
  },
  // Empty total land area skips the validation
  {
    cell,
    data: [otherLand('-100')],
    expected: undefined,
    name: `${ValidatorName.otherLand}: empty total land area is valid`,
    rows,
  },
  // Other land within the total land area is valid
  {
    cell,
    data: [otherLand('100'), totalLandArea('30000')],
    expected: undefined,
    name: `${ValidatorName.otherLand}: non negative other land is valid`,
    rows,
  },
  // Negative other land means the reported areas exceed the total land area
  {
    cell,
    data: [otherLand('-100'), totalLandArea('30000')],
    expected: {
      messages: [{ key: 'extentOfForest.fedAreasExceedTotalLandArea', name: ValidatorName.otherLand }],
      valid: false,
    },
    name: `${ValidatorName.otherLand}: negative other land is invalid`,
    rows,
  },
]
