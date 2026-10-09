import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

type Props = {
  variableName: VariableName
}

const tableName = 'table_3_1'
const colName = '_of_which_of_natural_losses'

const exceedsFellingsTotal = (maxValue: string): TableValidationTestCase['expected'] => ({
  messages: [
    { key: 'generalValidation.valueNotGreaterThan', name: ValidatorName.notGreaterThan, params: { maxValue } },
  ],
  valid: false,
})

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildCases = (props: Props): Array<TableValidationTestCase> => {
  const { variableName } = props
  const cell = { colName, tableName, variableName }
  const notGreaterThan = `${ValidatorName.notGreaterThan} (${variableName})`
  const datum = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })
  // The maximum is the fellings total of the same row
  const fellingsTotal = (raw: string): NodeUpdate => ({ ...cell, colName: 'fellings_total', value: { raw } })

  return [
    // Nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${notGreaterThan}: empty data is valid`,
    },
    // Without a fellings total there is no maximum to check
    {
      cell,
      data: [datum('50')],
      expected: undefined,
      name: `${notGreaterThan}: empty fellings total is valid`,
    },
    {
      cell,
      data: [fellingsTotal('100')],
      expected: undefined,
      name: `${notGreaterThan}: empty natural losses is valid`,
    },
    {
      cell,
      data: [fellingsTotal('100'), datum('50')],
      expected: undefined,
      name: `${notGreaterThan}: natural losses below the fellings total is valid`,
    },
    // There is no tolerance over the fellings total
    {
      cell,
      data: [fellingsTotal('100'), datum('100')],
      expected: undefined,
      name: `${notGreaterThan}: natural losses equal to the fellings total is valid`,
    },
    // The message carries the fellings total as reported
    {
      cell,
      data: [fellingsTotal('100'), datum('100.1')],
      expected: exceedsFellingsTotal('100'),
      name: `${notGreaterThan}: natural losses over the fellings total is invalid`,
    },
    // A fellings total of 0 counts as a value
    {
      cell,
      data: [fellingsTotal('0'), datum('1')],
      expected: exceedsFellingsTotal('0'),
      name: `${notGreaterThan}: natural losses over a fellings total of 0 is invalid`,
    },
  ]
}
