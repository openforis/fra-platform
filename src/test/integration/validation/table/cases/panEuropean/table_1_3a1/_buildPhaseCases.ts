import { ColName } from 'meta/assessment/col'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

type Props = {
  variableName: VariableName
}

const tableName = 'table_1_3a1'
const forestTypes: Array<VariableName> = [
  'predominantly_coniferous_forest_1990',
  'mixed_forest_1990',
  'predominantly_broadleaved_forest_1990',
]

const datum = (variableName: VariableName, colName: ColName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const data = (phase: ColName, raws: Array<string>): Array<NodeUpdate> =>
  forestTypes.map((forestType, index) => datum(forestType, phase, raws[index]))

const woodSupply = (phase: ColName, raw: string): NodeUpdate =>
  datum('available_for_wood_supply_of_which_1990', phase, raw)

const differentFromWoodSupply = (phase: ColName, valueRounded: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.valueEqualToSumParent',
      name: ValidatorName.equalToSum,
      params: {
        parentCol: { key: `panEuropean.ageClassDistributionAreaOfEvenAgedStands.${phase}` },
        parentTable: '1.3a.I',
        parentVariable: { key: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply' },
        subcategories: '',
        valueRounded,
      },
    },
  ],
  valid: false,
})

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildPhaseCases = (props: Props): Array<TableValidationTestCase> => {
  const { variableName } = props
  const cell = { colName: 'intermediate_phase', tableName, variableName }
  const equalToSum = `${ValidatorName.equalToSum} (${variableName})`

  return [
    // The phases of the three forest types add up to the wood supply phase, nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${equalToSum}: empty data is valid for the intermediate phase`,
    },
    // Empty wood supply skips the validation
    {
      cell,
      data: data('intermediate_phase', ['600', '300', '100']),
      expected: undefined,
      name: `${equalToSum}: empty wood supply intermediate phase is valid`,
    },
    {
      cell,
      data: [woodSupply('intermediate_phase', '1000')],
      expected: differentFromWoodSupply('intermediate_phase', '1000.00'),
      name: `${equalToSum}: wood supply intermediate phase without forest types is invalid`,
    },
    // Empty forest types don't count as 0, so not even a wood supply of 0 matches them
    {
      cell,
      data: [woodSupply('intermediate_phase', '0')],
      expected: differentFromWoodSupply('intermediate_phase', '0.00'),
      name: `${equalToSum}: wood supply intermediate phase of 0 without forest types is invalid`,
    },
    // Empty forest types are left out of the sum
    {
      cell,
      data: [
        woodSupply('intermediate_phase', '1000'),
        ...forestTypes.map((forestType) =>
          datum(forestType, 'intermediate_phase', forestType === variableName ? '' : '500')
        ),
      ],
      expected: undefined,
      name: `${equalToSum}: empty ${variableName} intermediate phase is valid`,
    },
    {
      cell,
      data: [woodSupply('intermediate_phase', '1000'), ...data('intermediate_phase', ['600', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: intermediate phase sum equal to the wood supply is valid`,
    },
    // The sum allows one unit of tolerance
    {
      cell,
      data: [woodSupply('intermediate_phase', '1000'), ...data('intermediate_phase', ['601', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: intermediate phase sum one unit over the wood supply is valid`,
    },
    {
      cell,
      data: [woodSupply('intermediate_phase', '1000'), ...data('intermediate_phase', ['602', '300', '100'])],
      expected: differentFromWoodSupply('intermediate_phase', '1000.00'),
      name: `${equalToSum}: intermediate phase sum over the wood supply is invalid`,
    },
    {
      cell,
      data: [woodSupply('intermediate_phase', '0'), datum(variableName, 'intermediate_phase', '2')],
      expected: differentFromWoodSupply('intermediate_phase', '0.00'),
      name: `${equalToSum}: over a wood supply intermediate phase of 0 is invalid`,
    },
    // The other phases are checked the same way against their own wood supply phase
    {
      cell: { ...cell, colName: 'mature_phase' },
      data: [woodSupply('mature_phase', '1000'), ...data('mature_phase', ['600', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: mature phase sum equal to the wood supply is valid`,
    },
    {
      cell: { ...cell, colName: 'mature_phase' },
      data: [woodSupply('mature_phase', '1000'), ...data('mature_phase', ['602', '300', '100'])],
      expected: differentFromWoodSupply('mature_phase', '1000.00'),
      name: `${equalToSum}: mature phase sum over the wood supply is invalid`,
    },
    {
      cell: { ...cell, colName: 'regeneration_phase' },
      data: [woodSupply('regeneration_phase', '1000'), ...data('regeneration_phase', ['600', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: regeneration phase sum equal to the wood supply is valid`,
    },
    {
      cell: { ...cell, colName: 'regeneration_phase' },
      data: [woodSupply('regeneration_phase', '1000'), ...data('regeneration_phase', ['602', '300', '100'])],
      expected: differentFromWoodSupply('regeneration_phase', '1000.00'),
      name: `${equalToSum}: regeneration phase sum over the wood supply is invalid`,
    },
    {
      cell: { ...cell, colName: 'unspecified' },
      data: [woodSupply('unspecified', '1000'), ...data('unspecified', ['600', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: unspecified sum equal to the wood supply is valid`,
    },
    {
      cell: { ...cell, colName: 'unspecified' },
      data: [woodSupply('unspecified', '1000'), ...data('unspecified', ['602', '300', '100'])],
      expected: differentFromWoodSupply('unspecified', '1000.00'),
      name: `${equalToSum}: unspecified sum over the wood supply is invalid`,
    },
  ]
}
