import { ColName } from 'meta/assessment/col'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_1_2a'
const colName = 'total'
const variableName = 'total_forest_and_other_wooded_land_1990'
const cell = { colName, tableName, variableName }
// Each column carries its own formula, so coniferous and broadleaved are tested too
const coniferousCell = { ...cell, colName: 'coniferous' }
const broadleavedCell = { ...cell, colName: 'broadleaved' }

const datum = (name: VariableName, raw: string, col = colName): NodeUpdate => ({
  colName: col,
  tableName,
  value: { raw },
  variableName: name,
})

const differentFromTotal = (col: ColName, valueRounded: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.valueEqualToSumParent',
      name: ValidatorName.equalToSum,
      params: {
        parentCol: { key: `panEuropean.growingStock.${col}` },
        parentTable: '1.2.I',
        parentVariable: { key: 'panEuropean.growingStock.total_forest_and_other_wooded_land_only' },
        subcategories: '',
        valueRounded,
      },
    },
  ],
  valid: false,
})

export const totalForestAndOtherWoodedLand1990: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid`,
  },
  // Empty total skips the validation
  {
    cell,
    data: [datum('forest_1990', '600'), datum('other_wooded_land_1990', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000')],
    expected: differentFromTotal('total', '1000.00'),
    name: `${ValidatorName.equalToSum}: total without forest and other wooded land is invalid`,
  },
  // Empty rows don't count as 0, so not even a total of 0 matches them
  {
    cell,
    data: [datum(variableName, '0')],
    expected: differentFromTotal('total', '0.00'),
    name: `${ValidatorName.equalToSum}: total of 0 without forest and other wooded land is invalid`,
  },
  // Empty rows are left out of the sum
  {
    cell,
    data: [datum(variableName, '600'), datum('forest_1990', '600')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only forest equal to the total is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), datum('forest_1990', '600'), datum('other_wooded_land_1990', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum(variableName, '1000'), datum('forest_1990', '601'), datum('other_wooded_land_1990', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total is valid`,
  },
  // A sum more than one unit over or below the total is invalid
  {
    cell,
    data: [datum(variableName, '1000'), datum('forest_1990', '602'), datum('other_wooded_land_1990', '400')],
    expected: differentFromTotal('total', '1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the total is invalid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), datum('forest_1990', '590'), datum('other_wooded_land_1990', '400')],
    expected: differentFromTotal('total', '1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the total is invalid`,
  },
  // Reported zeroes count as values, so zero rows match a total of 0
  {
    cell,
    data: [datum(variableName, '0'), datum('forest_1990', '0'), datum('other_wooded_land_1990', '0')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum(variableName, '0'), datum('forest_1990', '2')],
    expected: differentFromTotal('total', '0.00'),
    name: `${ValidatorName.equalToSum}: over a total of 0 is invalid`,
  },
  // Coniferous and broadleaved are checked the same way against their own column
  {
    cell: coniferousCell,
    data: [datum(variableName, '1000', 'coniferous')],
    expected: differentFromTotal('coniferous', '1000.00'),
    name: `${ValidatorName.equalToSum}: coniferous total without forest and other wooded land is invalid`,
  },
  {
    cell: coniferousCell,
    data: [
      datum(variableName, '1000', 'coniferous'),
      datum('forest_1990', '600', 'coniferous'),
      datum('other_wooded_land_1990', '400', 'coniferous'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: coniferous sum equal to the coniferous total is valid`,
  },
  {
    cell: coniferousCell,
    data: [
      datum(variableName, '1000', 'coniferous'),
      datum('forest_1990', '602', 'coniferous'),
      datum('other_wooded_land_1990', '400', 'coniferous'),
    ],
    expected: differentFromTotal('coniferous', '1000.00'),
    name: `${ValidatorName.equalToSum}: coniferous sum over the coniferous total is invalid`,
  },
  {
    cell: broadleavedCell,
    data: [datum(variableName, '1000', 'broadleaved')],
    expected: differentFromTotal('broadleaved', '1000.00'),
    name: `${ValidatorName.equalToSum}: broadleaved total without forest and other wooded land is invalid`,
  },
  {
    cell: broadleavedCell,
    data: [
      datum(variableName, '1000', 'broadleaved'),
      datum('forest_1990', '600', 'broadleaved'),
      datum('other_wooded_land_1990', '400', 'broadleaved'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: broadleaved sum equal to the broadleaved total is valid`,
  },
  {
    cell: broadleavedCell,
    data: [
      datum(variableName, '1000', 'broadleaved'),
      datum('forest_1990', '602', 'broadleaved'),
      datum('other_wooded_land_1990', '400', 'broadleaved'),
    ],
    expected: differentFromTotal('broadleaved', '1000.00'),
    name: `${ValidatorName.equalToSum}: broadleaved sum over the broadleaved total is invalid`,
  },
]
