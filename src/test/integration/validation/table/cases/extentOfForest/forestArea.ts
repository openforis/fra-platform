import { NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { TableNames } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.extentOfForest
const colName = '1990'
const cell = { colName, tableName, variableName: 'forestArea' }

const datum = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })

const differentFromPreviousCycle = (forestArea2020: number, forestArea2025: number): NodeValueValidationMessage => ({
  key: 'generalValidation.forestAreaReportedIsDifferentFromPreviousCycle',
  name: ValidatorName.equalToPreviousCycleForestArea,
  params: { forestArea2020: Numbers.format(forestArea2020), forestArea2025: Numbers.format(forestArea2025) },
})
const negative = { key: 'generalValidation.valueMustBePositive', name: ValidatorName.greaterThanOrZero }

export const forestArea: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToPreviousCycleForestArea}: empty data is valid`,
  },
  // Empty previous cycle skips the validation
  {
    cell,
    data: [datum('22409')],
    expected: undefined,
    name: `${ValidatorName.equalToPreviousCycleForestArea}: empty previous cycle is valid`,
  },
  // Empty current cycle skips the validation
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToPreviousCycleForestArea}: empty current cycle is valid`,
    previousCycleData: [datum('22409')],
  },
  {
    cell,
    data: [datum('22409')],
    expected: undefined,
    name: `${ValidatorName.equalToPreviousCycleForestArea}: equal to the previous cycle is valid`,
    previousCycleData: [datum('22409')],
  },
  // The check allows one unit of tolerance
  {
    cell,
    data: [datum('22410')],
    expected: undefined,
    name: `${ValidatorName.equalToPreviousCycleForestArea}: one unit over the previous cycle is valid`,
    previousCycleData: [datum('22409')],
  },
  {
    cell,
    data: [datum('22411')],
    expected: { messages: [differentFromPreviousCycle(22409, 22411)], valid: false },
    name: `${ValidatorName.equalToPreviousCycleForestArea}: different from the previous cycle is invalid`,
    previousCycleData: [datum('22409')],
  },
  // Zero is included in the valid range
  {
    cell,
    data: [datum('0')],
    expected: undefined,
    name: `${ValidatorName.greaterThanOrZero}: zero is valid`,
  },
  {
    cell,
    data: [datum('-100')],
    expected: { messages: [negative], valid: false },
    name: `${ValidatorName.greaterThanOrZero}: negative forest area is invalid`,
  },
  // Both formulas fail and their messages are merged
  {
    cell,
    data: [datum('-100')],
    expected: { messages: [differentFromPreviousCycle(22409, -100), negative], valid: false },
    name: `${ValidatorName.greaterThanOrZero}: negative forest area different from the previous cycle fails both`,
    previousCycleData: [datum('22409')],
  },
]
