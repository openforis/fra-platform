import { ColName } from 'meta/assessment/col'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_2_5'
const colName = 'totalAreaOfDegradedLand'
const variableName = 'forest_1990'
const cell = { colName, tableName, variableName }
const agents: Array<ColName> = [
  'agentOne',
  'agentTwo',
  'agentThree',
  'agentFour',
  'agentFive',
  'unknownMixedDegradation',
]

const datum = (raw: string, col = colName): NodeUpdate => ({ ...cell, colName: col, value: { raw } })

const data = (raws: Array<string>): Array<NodeUpdate> => agents.map((agent, index) => datum(raws[index], agent))

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

export const forest1990: Array<TableValidationTestCase> = [
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
    data: data(['300', '200', '200', '100', '100', '100']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total degraded area is valid`,
  },
  {
    cell,
    data: [datum('1000')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: total degraded area without agents is invalid`,
  },
  // Empty agents don't count as 0, so not even a total of 0 matches them
  {
    cell,
    data: [datum('0')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total degraded area of 0 without agents is invalid`,
  },
  // Empty agents are left out of the sum
  {
    cell,
    data: [datum('300'), datum('300', 'agentOne')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only agent one equal to the total degraded area is valid`,
  },
  {
    cell,
    data: [datum('1000'), ...data(['300', '200', '200', '100', '100', '100'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total degraded area is valid`,
  },
  // Each year row checks its own values, a wrong 2020 breakdown doesn't reach the 1990 row
  {
    cell,
    data: [
      datum('1000'),
      ...data(['300', '200', '200', '100', '100', '100']),
      { ...cell, variableName: 'forest_2020', value: { raw: '1000' } },
      { ...cell, colName: 'agentOne', variableName: 'forest_2020', value: { raw: '500' } },
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total degraded area with a wrong 2020 breakdown is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum('1000'), ...data(['301', '200', '200', '100', '100', '100'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total degraded area is valid`,
  },
  // A sum more than one unit over or below the total is invalid
  {
    cell,
    data: [datum('1000'), ...data(['302', '200', '200', '100', '100', '100'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the total degraded area is invalid`,
  },
  {
    cell,
    data: [datum('1000'), ...data(['290', '200', '200', '100', '100', '100'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the total degraded area is invalid`,
  },
  // Reported zeroes count as values, so zero agents match a total of 0
  {
    cell,
    data: [datum('0'), ...data(['0', '0', '0', '0', '0', '0'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum('0'), datum('2', 'agentOne')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: over a total degraded area of 0 is invalid`,
  },
]
