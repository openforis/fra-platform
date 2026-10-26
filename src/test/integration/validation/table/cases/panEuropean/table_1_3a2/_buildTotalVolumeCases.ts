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

const tableName = 'table_1_3a2'
// The formula is the same on every column, so only the total volume is tested
const colName = 'total_volume'
const phases: Array<ColName> = ['intermediate_phase', 'mature_phase', 'regeneration_phase', 'unspecified']

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildTotalVolumeCases = (props: Props): Array<TableValidationTestCase> => {
  const { parentVariable, variableName } = props
  const cell = { colName, tableName, variableName }
  const equalToSum = `${ValidatorName.equalToSum} (${variableName})`
  const datum = (col: ColName, raw: string): NodeUpdate => ({ ...cell, colName: col, value: { raw } })
  const data = (raws: Array<string>): Array<NodeUpdate> => phases.map((phase, index) => datum(phase, raws[index]))

  const differentFromTotalVolume = (valueRounded: string): TableValidationTestCase['expected'] => ({
    messages: [
      {
        key: 'generalValidation.valueEqualToSumParent',
        name: ValidatorName.equalToSum,
        params: {
          parentCol: {
            key: 'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume',
          },
          parentTable: '1.3a2',
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
    // Empty total volume skips the validation
    {
      cell,
      data: data(['400', '300', '200', '100']),
      expected: undefined,
      name: `${equalToSum}: empty total volume is valid`,
    },
    {
      cell,
      data: [datum('total_volume', '1000')],
      expected: differentFromTotalVolume('1000.00'),
      name: `${equalToSum}: total volume without phases is invalid`,
    },
    // Empty phases don't count as 0, so not even a total volume of 0 matches them
    {
      cell,
      data: [datum('total_volume', '0')],
      expected: differentFromTotalVolume('0.00'),
      name: `${equalToSum}: total volume of 0 without phases is invalid`,
    },
    // Empty phases are left out of the sum
    {
      cell,
      data: [datum('total_volume', '400'), datum('intermediate_phase', '400')],
      expected: undefined,
      name: `${equalToSum}: only intermediate phase equal to the total volume is valid`,
    },
    {
      cell,
      data: [datum('total_volume', '1000'), ...data(['400', '300', '200', '100'])],
      expected: undefined,
      name: `${equalToSum}: sum equal to the total volume is valid`,
    },
    // The sum allows one unit of tolerance
    {
      cell,
      data: [datum('total_volume', '1000'), ...data(['401', '300', '200', '100'])],
      expected: undefined,
      name: `${equalToSum}: sum one unit over the total volume is valid`,
    },
    // A sum more than one unit over or below the total volume is invalid
    {
      cell,
      data: [datum('total_volume', '1000'), ...data(['402', '300', '200', '100'])],
      expected: differentFromTotalVolume('1000.00'),
      name: `${equalToSum}: sum over the total volume is invalid`,
    },
    {
      cell,
      data: [datum('total_volume', '1000'), ...data(['390', '300', '200', '100'])],
      expected: differentFromTotalVolume('1000.00'),
      name: `${equalToSum}: sum below the total volume is invalid`,
    },
    // Reported zeroes count as values, so zero phases match a total volume of 0
    {
      cell,
      data: [datum('total_volume', '0'), ...data(['0', '0', '0', '0'])],
      expected: undefined,
      name: `${equalToSum}: all zero values are valid`,
    },
    {
      cell,
      data: [datum('total_volume', '0'), datum('intermediate_phase', '2')],
      expected: differentFromTotalVolume('0.00'),
      name: `${equalToSum}: over a total volume of 0 is invalid`,
    },
  ]
}
