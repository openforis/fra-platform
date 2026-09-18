import { NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_4_5'
const colName = 'total'
const variableName = 'coniferous_2015'
const cell = { colName, tableName, variableName }
// Standing and lying carry two formulas each: the coniferous total and the total forest and other wooded land of the column
const standingCell = { ...cell, colName: 'standing' }
const lyingCell = { ...cell, colName: 'lying' }

const datum = (name: VariableName, raw: string, col = colName): NodeUpdate => ({
  colName: col,
  tableName,
  value: { raw },
  variableName: name,
})

// The metadata passes the parent as a raw name rather than a label key
const differentFromParent = (parentVariable: string, valueRounded: string): NodeValueValidationMessage => ({
  key: 'generalValidation.valueEqualToSumParent',
  name: ValidatorName.equalToSum,
  params: {
    parentCol: { key: '' },
    parentTable: '',
    parentVariable: { key: parentVariable },
    subcategories: '',
    valueRounded,
  },
})

const differentFromTotal = (col: string, valueRounded: string): NodeValueValidationMessage =>
  differentFromParent(`table_4_5.total_forest_and_other_wooded_land_2015[${col}]`, valueRounded)

const differentFromConiferousTotal = (valueRounded: string): NodeValueValidationMessage =>
  differentFromParent('table_4_5.coniferous_2015[total]', valueRounded)

export const coniferous2015: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid`,
  },
  // Empty total forest and other wooded land skips the validation
  {
    cell,
    data: [datum(variableName, '600'), datum('broadleaved_2015', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total forest and other wooded land is valid`,
  },
  {
    cell,
    data: [datum('total_forest_and_other_wooded_land_2015', '1000')],
    expected: { messages: [differentFromTotal('total', '1000.00')], valid: false },
    name: `${ValidatorName.equalToSum}: total forest and other wooded land without coniferous and broadleaved is invalid`,
  },
  // Empty rows don't count as 0, so not even a total of 0 matches them
  {
    cell,
    data: [datum('total_forest_and_other_wooded_land_2015', '0')],
    expected: { messages: [differentFromTotal('total', '0.00')], valid: false },
    name: `${ValidatorName.equalToSum}: total forest and other wooded land of 0 without coniferous and broadleaved is invalid`,
  },
  // Empty rows are left out of the sum
  {
    cell,
    data: [datum('total_forest_and_other_wooded_land_2015', '600'), datum(variableName, '600')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only coniferous equal to the total forest and other wooded land is valid`,
  },
  {
    cell,
    data: [datum('total_forest_and_other_wooded_land_2015', '400'), datum('broadleaved_2015', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only broadleaved equal to the total forest and other wooded land is valid`,
  },
  {
    cell,
    data: [
      datum('total_forest_and_other_wooded_land_2015', '1000'),
      datum(variableName, '600'),
      datum('broadleaved_2015', '400'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total forest and other wooded land is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [
      datum('total_forest_and_other_wooded_land_2015', '1000'),
      datum(variableName, '601'),
      datum('broadleaved_2015', '400'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total forest and other wooded land is valid`,
  },
  // A sum more than one unit over or below the total is invalid
  {
    cell,
    data: [
      datum('total_forest_and_other_wooded_land_2015', '1000'),
      datum(variableName, '602'),
      datum('broadleaved_2015', '400'),
    ],
    expected: { messages: [differentFromTotal('total', '1000.00')], valid: false },
    name: `${ValidatorName.equalToSum}: sum over the total forest and other wooded land is invalid`,
  },
  {
    cell,
    data: [
      datum('total_forest_and_other_wooded_land_2015', '1000'),
      datum(variableName, '590'),
      datum('broadleaved_2015', '400'),
    ],
    expected: { messages: [differentFromTotal('total', '1000.00')], valid: false },
    name: `${ValidatorName.equalToSum}: sum below the total forest and other wooded land is invalid`,
  },
  // Reported zeroes count as values, so zero rows match a total of 0
  {
    cell,
    data: [
      datum('total_forest_and_other_wooded_land_2015', '0'),
      datum(variableName, '0'),
      datum('broadleaved_2015', '0'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum('total_forest_and_other_wooded_land_2015', '0'), datum(variableName, '2')],
    expected: { messages: [differentFromTotal('total', '0.00')], valid: false },
    name: `${ValidatorName.equalToSum}: over a total forest and other wooded land of 0 is invalid`,
  },
  // Standing is checked against the coniferous total and against the standing total forest and other wooded land
  {
    cell: standingCell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid for standing`,
  },
  {
    cell: standingCell,
    data: [datum(variableName, '1000')],
    expected: { messages: [differentFromConiferousTotal('1000.00')], valid: false },
    name: `${ValidatorName.equalToSum}: coniferous total without standing and lying is invalid`,
  },
  {
    cell: standingCell,
    data: [datum('total_forest_and_other_wooded_land_2015', '1000', 'standing')],
    expected: { messages: [differentFromTotal('standing', '1000.00')], valid: false },
    name: `${ValidatorName.equalToSum}: standing total forest and other wooded land without coniferous and broadleaved is invalid`,
  },
  // Empty columns don't count as 0, so not even a total of 0 matches them, for either formula
  {
    cell: standingCell,
    data: [datum(variableName, '0')],
    expected: { messages: [differentFromConiferousTotal('0.00')], valid: false },
    name: `${ValidatorName.equalToSum}: coniferous total of 0 without standing and lying is invalid`,
  },
  {
    cell: standingCell,
    data: [datum('total_forest_and_other_wooded_land_2015', '0', 'standing')],
    expected: { messages: [differentFromTotal('standing', '0.00')], valid: false },
    name: `${ValidatorName.equalToSum}: standing total forest and other wooded land of 0 without coniferous and broadleaved is invalid`,
  },
  {
    cell: standingCell,
    data: [
      datum(variableName, '1000'),
      datum(variableName, '600', 'standing'),
      datum(variableName, '400', 'lying'),
      datum('total_forest_and_other_wooded_land_2015', '1000', 'standing'),
      datum('broadleaved_2015', '400', 'standing'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: standing equal to the coniferous total and to the standing total forest and other wooded land is valid`,
  },
  // Over both totals, the two formulas fail and their messages are merged
  {
    cell: standingCell,
    data: [
      datum(variableName, '1000'),
      datum(variableName, '602', 'standing'),
      datum(variableName, '400', 'lying'),
      datum('total_forest_and_other_wooded_land_2015', '1000', 'standing'),
      datum('broadleaved_2015', '400', 'standing'),
    ],
    expected: {
      messages: [differentFromConiferousTotal('1000.00'), differentFromTotal('standing', '1000.00')],
      valid: false,
    },
    name: `${ValidatorName.equalToSum}: standing over the coniferous total and the standing total forest and other wooded land fails both`,
  },
  // Lying is checked the same way
  {
    cell: lyingCell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid for lying`,
  },
  {
    cell: lyingCell,
    data: [datum(variableName, '0')],
    expected: { messages: [differentFromConiferousTotal('0.00')], valid: false },
    name: `${ValidatorName.equalToSum}: coniferous total of 0 without standing and lying is invalid for lying`,
  },
  {
    cell: lyingCell,
    data: [datum('total_forest_and_other_wooded_land_2015', '0', 'lying')],
    expected: { messages: [differentFromTotal('lying', '0.00')], valid: false },
    name: `${ValidatorName.equalToSum}: lying total forest and other wooded land of 0 without coniferous and broadleaved is invalid`,
  },
  {
    cell: lyingCell,
    data: [
      datum(variableName, '1000'),
      datum(variableName, '600', 'standing'),
      datum(variableName, '400', 'lying'),
      datum('total_forest_and_other_wooded_land_2015', '1000', 'lying'),
      datum('broadleaved_2015', '600', 'lying'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: lying equal to the coniferous total and to the lying total forest and other wooded land is valid`,
  },
  {
    cell: lyingCell,
    data: [
      datum(variableName, '1000'),
      datum(variableName, '600', 'standing'),
      datum(variableName, '402', 'lying'),
      datum('total_forest_and_other_wooded_land_2015', '1000', 'lying'),
      datum('broadleaved_2015', '600', 'lying'),
    ],
    expected: {
      messages: [differentFromConiferousTotal('1000.00'), differentFromTotal('lying', '1000.00')],
      valid: false,
    },
    name: `${ValidatorName.equalToSum}: lying over the coniferous total and the lying total forest and other wooded land fails both`,
  },
]
