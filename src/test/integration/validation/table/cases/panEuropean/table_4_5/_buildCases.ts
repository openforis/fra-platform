import { ColName } from 'meta/assessment/col'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

type Props = {
  variableName: VariableName
}

const tableName = 'table_4_5'
// The formula is the same on every column, so only the total is tested
const colName = 'total'
const categories: Array<ColName> = ['standing', 'lying']

// The metadata passes no labels to the formula, so the message carries the validator defaults
const differentFromTotal = (valueRounded: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.valueEqualToSumParent',
      name: ValidatorName.equalToSum,
      params: {
        parentCol: { key: '' },
        parentTable: '',
        parentVariable: { key: 'parent' },
        subcategories: '',
        valueRounded,
      },
    },
  ],
  valid: false,
})

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildCases = (props: Props): Array<TableValidationTestCase> => {
  const { variableName } = props
  const cell = { colName, tableName, variableName }
  const equalToSum = `${ValidatorName.equalToSum} (${variableName})`
  const datum = (raw: string, col = colName): NodeUpdate => ({ ...cell, colName: col, value: { raw } })
  const data = (raws: Array<string>): Array<NodeUpdate> =>
    categories.map((category, index) => datum(raws[index], category))

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
      data: data(['600', '400']),
      expected: undefined,
      name: `${equalToSum}: empty total is valid`,
    },
    {
      cell,
      data: [datum('1000')],
      expected: differentFromTotal('1000.00'),
      name: `${equalToSum}: total without standing and lying is invalid`,
    },
    // Empty columns don't count as 0, so not even a total of 0 matches them
    {
      cell,
      data: [datum('0')],
      expected: differentFromTotal('0.00'),
      name: `${equalToSum}: total of 0 without standing and lying is invalid`,
    },
    // Empty columns are left out of the sum
    {
      cell,
      data: [datum('600'), datum('600', 'standing')],
      expected: undefined,
      name: `${equalToSum}: only standing equal to the total is valid`,
    },
    {
      cell,
      data: [datum('400'), datum('400', 'lying')],
      expected: undefined,
      name: `${equalToSum}: only lying equal to the total is valid`,
    },
    {
      cell,
      data: [datum('1000'), ...data(['600', '400'])],
      expected: undefined,
      name: `${equalToSum}: sum equal to the total is valid`,
    },
    // The sum allows one unit of tolerance
    {
      cell,
      data: [datum('1000'), ...data(['601', '400'])],
      expected: undefined,
      name: `${equalToSum}: sum one unit over the total is valid`,
    },
    // A sum more than one unit over or below the total is invalid
    {
      cell,
      data: [datum('1000'), ...data(['602', '400'])],
      expected: differentFromTotal('1000.00'),
      name: `${equalToSum}: sum over the total is invalid`,
    },
    {
      cell,
      data: [datum('1000'), ...data(['590', '400'])],
      expected: differentFromTotal('1000.00'),
      name: `${equalToSum}: sum below the total is invalid`,
    },
    // Reported zeroes count as values, so zero columns match a total of 0
    {
      cell,
      data: [datum('0'), ...data(['0', '0'])],
      expected: undefined,
      name: `${equalToSum}: all zero values are valid`,
    },
    {
      cell,
      data: [datum('0'), datum('2', 'standing')],
      expected: differentFromTotal('0.00'),
      name: `${equalToSum}: over a total of 0 is invalid`,
    },
  ]
}
