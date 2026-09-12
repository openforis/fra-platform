import { ColName } from 'meta/assessment/col'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

type Props = {
  // The metadata passes a different parentVariable to each row
  parentVariable: string
  variableName: VariableName
}

const tableName = 'table_1_2a'
// The formula is the same on every column, so only the total is tested
const colName = 'total'

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildCases = (props: Props): Array<TableValidationTestCase> => {
  const { parentVariable, variableName } = props
  const cell = { colName, tableName, variableName }
  const equalToSum = `${ValidatorName.equalToSum} (${variableName})`
  const datum = (col: ColName, raw: string): NodeUpdate => ({ ...cell, colName: col, value: { raw } })

  const differentFromTotal = (valueRounded: string): TableValidationTestCase['expected'] => ({
    messages: [
      {
        key: 'generalValidation.valueEqualToSumParent',
        name: ValidatorName.equalToSum,
        params: {
          parentCol: { key: 'panEuropean.growingStock.total' },
          parentTable: '1.2.I',
          parentVariable: { key: parentVariable },
          subcategories: '',
          valueRounded,
        },
      },
    ],
    valid: false,
  })

  return [
    // Nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${equalToSum}: empty data is valid`,
    },
    // Empty total skips the validation
    {
      cell,
      data: [datum('coniferous', '600'), datum('broadleaved', '400')],
      expected: undefined,
      name: `${equalToSum}: empty total is valid`,
    },
    {
      cell,
      data: [datum('total', '1000')],
      expected: differentFromTotal('1000.00'),
      name: `${equalToSum}: total without coniferous and broadleaved is invalid`,
    },
    // Empty columns don't count as 0, so not even a total of 0 matches them
    {
      cell,
      data: [datum('total', '0')],
      expected: differentFromTotal('0.00'),
      name: `${equalToSum}: total of 0 without coniferous and broadleaved is invalid`,
    },
    // Empty columns are left out of the sum
    {
      cell,
      data: [datum('total', '600'), datum('coniferous', '600')],
      expected: undefined,
      name: `${equalToSum}: only coniferous equal to the total is valid`,
    },
    {
      cell,
      data: [datum('total', '1000'), datum('coniferous', '600'), datum('broadleaved', '400')],
      expected: undefined,
      name: `${equalToSum}: sum equal to the total is valid`,
    },
    // The sum allows one unit of tolerance
    {
      cell,
      data: [datum('total', '1000'), datum('coniferous', '601'), datum('broadleaved', '400')],
      expected: undefined,
      name: `${equalToSum}: sum one unit over the total is valid`,
    },
    // A sum more than one unit over or below the total is invalid
    {
      cell,
      data: [datum('total', '1000'), datum('coniferous', '602'), datum('broadleaved', '400')],
      expected: differentFromTotal('1000.00'),
      name: `${equalToSum}: sum over the total is invalid`,
    },
    {
      cell,
      data: [datum('total', '1000'), datum('coniferous', '590'), datum('broadleaved', '400')],
      expected: differentFromTotal('1000.00'),
      name: `${equalToSum}: sum below the total is invalid`,
    },
    // Reported zeroes count as values, so zero columns match a total of 0
    {
      cell,
      data: [datum('total', '0'), datum('coniferous', '0'), datum('broadleaved', '0')],
      expected: undefined,
      name: `${equalToSum}: all zero values are valid`,
    },
    {
      cell,
      data: [datum('total', '0'), datum('coniferous', '2')],
      expected: differentFromTotal('0.00'),
      name: `${equalToSum}: over a total of 0 is invalid`,
    },
  ]
}
