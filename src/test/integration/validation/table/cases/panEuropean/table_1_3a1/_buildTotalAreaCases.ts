import { ColName } from 'meta/assessment/col'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

type Props = {
  // The formula is the same on every column, so only one is tested: the total area unless it carries its own formula
  colName?: ColName
  // The metadata passes a different parentVariable to each row
  parentVariable: string
  variableName: VariableName
}

const tableName = 'table_1_3a1'
const phases: Array<ColName> = ['intermediate_phase', 'mature_phase', 'regeneration_phase', 'unspecified']

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildTotalAreaCases = (props: Props): Array<TableValidationTestCase> => {
  const { colName = 'total_area', parentVariable, variableName } = props
  const cell = { colName, tableName, variableName }
  const equalToSum = `${ValidatorName.equalToSum} (${variableName})`
  const datum = (col: ColName, raw: string): NodeUpdate => ({ ...cell, colName: col, value: { raw } })
  const data = (raws: Array<string>): Array<NodeUpdate> => phases.map((phase, index) => datum(phase, raws[index]))

  const differentFromTotalArea = (valueRounded: string): TableValidationTestCase['expected'] => ({
    messages: [
      {
        key: 'generalValidation.valueEqualToSumParent',
        name: ValidatorName.equalToSum,
        params: {
          parentCol: { key: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area' },
          parentTable: '1.3a.I',
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
    // Empty total area skips the validation
    {
      cell,
      data: data(['400', '300', '200', '100']),
      expected: undefined,
      name: `${equalToSum}: empty total area is valid`,
    },
    {
      cell,
      data: [datum('total_area', '1000')],
      expected: differentFromTotalArea('1000.00'),
      name: `${equalToSum}: total area without phases is invalid`,
    },
    // Empty phases don't count as 0, so not even a total area of 0 matches them
    {
      cell,
      data: [datum('total_area', '0')],
      expected: differentFromTotalArea('0.00'),
      name: `${equalToSum}: total area of 0 without phases is invalid`,
    },
    // Empty phases are left out of the sum
    {
      cell,
      data: [datum('total_area', '400'), datum('intermediate_phase', '400')],
      expected: undefined,
      name: `${equalToSum}: only intermediate phase equal to the total area is valid`,
    },
    {
      cell,
      data: [datum('total_area', '1000'), ...data(['400', '300', '200', '100'])],
      expected: undefined,
      name: `${equalToSum}: sum equal to the total area is valid`,
    },
    // The sum allows one unit of tolerance
    {
      cell,
      data: [datum('total_area', '1000'), ...data(['401', '300', '200', '100'])],
      expected: undefined,
      name: `${equalToSum}: sum one unit over the total area is valid`,
    },
    // A sum more than one unit over or below the total area is invalid
    {
      cell,
      data: [datum('total_area', '1000'), ...data(['402', '300', '200', '100'])],
      expected: differentFromTotalArea('1000.00'),
      name: `${equalToSum}: sum over the total area is invalid`,
    },
    {
      cell,
      data: [datum('total_area', '1000'), ...data(['390', '300', '200', '100'])],
      expected: differentFromTotalArea('1000.00'),
      name: `${equalToSum}: sum below the total area is invalid`,
    },
    // Reported zeroes count as values, so zero phases match a total area of 0
    {
      cell,
      data: [datum('total_area', '0'), ...data(['0', '0', '0', '0'])],
      expected: undefined,
      name: `${equalToSum}: all zero values are valid`,
    },
    {
      cell,
      data: [datum('total_area', '0'), datum('intermediate_phase', '2')],
      expected: differentFromTotalArea('0.00'),
      name: `${equalToSum}: over a total area of 0 is invalid`,
    },
  ]
}
