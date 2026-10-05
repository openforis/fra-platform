import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_6_9'
// The row carries one formula per year and unit, all alike, so only the 2007 TJ column is tested
const colName = 'tj_2007'
const variableName = 'energy_from_direct_wood_fibre_sources'
const cell = { colName, tableName, variableName }
const categories: Array<VariableName> = ['of_which_from_other_wooded_land', 'of_which_from_forests']

const datum = (name: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName: name,
})

const data = (raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(category, raws[index]))

// The metadata passes no labels to the formula, so the message carries the validator defaults
const differentFromDirectSources = (valueRounded: string): TableValidationTestCase['expected'] => ({
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

export const energyFromDirectWoodFibreSources: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty data is valid`,
  },
  // Empty direct sources skip the validation
  {
    cell,
    data: data(['400', '600']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty direct wood fibre sources is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000')],
    expected: differentFromDirectSources('1000.00'),
    name: `${ValidatorName.equalToSum}: direct wood fibre sources without forests and other wooded land is invalid`,
  },
  // Empty rows don't count as 0, so not even direct sources of 0 match them
  {
    cell,
    data: [datum(variableName, '0')],
    expected: differentFromDirectSources('0.00'),
    name: `${ValidatorName.equalToSum}: direct wood fibre sources of 0 without forests and other wooded land is invalid`,
  },
  // Empty rows are left out of the sum
  {
    cell,
    data: [datum(variableName, '600'), datum('of_which_from_forests', '600')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only forests equal to the direct wood fibre sources is valid`,
  },
  {
    cell,
    data: [datum(variableName, '400'), datum('of_which_from_other_wooded_land', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only other wooded land equal to the direct wood fibre sources is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(['400', '600'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the direct wood fibre sources is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum(variableName, '1000'), ...data(['401', '600'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the direct wood fibre sources is valid`,
  },
  // A sum more than one unit over or below the direct sources is invalid
  {
    cell,
    data: [datum(variableName, '1000'), ...data(['402', '600'])],
    expected: differentFromDirectSources('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the direct wood fibre sources is invalid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(['390', '600'])],
    expected: differentFromDirectSources('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the direct wood fibre sources is invalid`,
  },
  // Reported zeroes count as values, so zero rows match direct sources of 0
  {
    cell,
    data: [datum(variableName, '0'), ...data(['0', '0'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum(variableName, '0'), datum('of_which_from_forests', '2')],
    expected: differentFromDirectSources('0.00'),
    name: `${ValidatorName.equalToSum}: over direct wood fibre sources of 0 is invalid`,
  },
]
