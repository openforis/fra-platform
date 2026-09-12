import { ColName } from 'meta/assessment/col'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

type Props = {
  variableName: VariableName
}

const tableName = 'table_1_4a'
const categories: Array<VariableName> = ['other_wooded_land_1990', 'forest_1990']

const datum = (variableName: VariableName, colName: ColName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const data = (pool: ColName, raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(category, pool, raws[index]))

const total = (pool: ColName, raw: string): NodeUpdate => datum('total_forest_and_other_wooded_land_1990', pool, raw)

// The metadata passes no labels to the formulas, so the message carries the validator defaults
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
  const cell = { colName: 'above_ground', tableName, variableName }
  const equalToSum = `${ValidatorName.equalToSum} (${variableName})`

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
      data: data('above_ground', ['400', '600']),
      expected: undefined,
      name: `${equalToSum}: empty total above ground is valid`,
    },
    {
      cell,
      data: [total('above_ground', '1000')],
      expected: differentFromTotal('1000.00'),
      name: `${equalToSum}: total above ground without forest and other wooded land is invalid`,
    },
    // Empty rows don't count as 0, so not even a total of 0 matches them
    {
      cell,
      data: [total('above_ground', '0')],
      expected: differentFromTotal('0.00'),
      name: `${equalToSum}: total above ground of 0 without forest and other wooded land is invalid`,
    },
    // Empty rows are left out of the sum
    {
      cell,
      data: [
        total('above_ground', '400'),
        ...categories.map((category) => datum(category, 'above_ground', category === variableName ? '' : '400')),
      ],
      expected: undefined,
      name: `${equalToSum}: empty ${variableName} above ground is valid`,
    },
    {
      cell,
      data: [total('above_ground', '1000'), ...data('above_ground', ['400', '600'])],
      expected: undefined,
      name: `${equalToSum}: above ground sum equal to the total is valid`,
    },
    // The sum allows one unit of tolerance
    {
      cell,
      data: [total('above_ground', '1000'), ...data('above_ground', ['401', '600'])],
      expected: undefined,
      name: `${equalToSum}: above ground sum one unit over the total is valid`,
    },
    // A sum more than one unit over or below the total is invalid
    {
      cell,
      data: [total('above_ground', '1000'), ...data('above_ground', ['402', '600'])],
      expected: differentFromTotal('1000.00'),
      name: `${equalToSum}: above ground sum over the total is invalid`,
    },
    {
      cell,
      data: [total('above_ground', '1000'), ...data('above_ground', ['390', '600'])],
      expected: differentFromTotal('1000.00'),
      name: `${equalToSum}: above ground sum below the total is invalid`,
    },
    // Reported zeroes count as values, so zero rows match a total of 0
    {
      cell,
      data: [total('above_ground', '0'), ...data('above_ground', ['0', '0'])],
      expected: undefined,
      name: `${equalToSum}: all zero values are valid`,
    },
    {
      cell,
      data: [total('above_ground', '0'), datum(variableName, 'above_ground', '2')],
      expected: differentFromTotal('0.00'),
      name: `${equalToSum}: over a total above ground of 0 is invalid`,
    },
    // The other pools are checked the same way against their own total
    {
      cell: { ...cell, colName: 'below_ground' },
      data: [total('below_ground', '1000'), ...data('below_ground', ['400', '600'])],
      expected: undefined,
      name: `${equalToSum}: below ground sum equal to the total is valid`,
    },
    {
      cell: { ...cell, colName: 'below_ground' },
      data: [total('below_ground', '1000'), ...data('below_ground', ['402', '600'])],
      expected: differentFromTotal('1000.00'),
      name: `${equalToSum}: below ground sum over the total is invalid`,
    },
    {
      cell: { ...cell, colName: 'deadwood' },
      data: [total('deadwood', '1000'), ...data('deadwood', ['400', '600'])],
      expected: undefined,
      name: `${equalToSum}: deadwood sum equal to the total is valid`,
    },
    {
      cell: { ...cell, colName: 'deadwood' },
      data: [total('deadwood', '1000'), ...data('deadwood', ['402', '600'])],
      expected: differentFromTotal('1000.00'),
      name: `${equalToSum}: deadwood sum over the total is invalid`,
    },
    {
      cell: { ...cell, colName: 'litter' },
      data: [total('litter', '1000'), ...data('litter', ['400', '600'])],
      expected: undefined,
      name: `${equalToSum}: litter sum equal to the total is valid`,
    },
    {
      cell: { ...cell, colName: 'litter' },
      data: [total('litter', '1000'), ...data('litter', ['402', '600'])],
      expected: differentFromTotal('1000.00'),
      name: `${equalToSum}: litter sum over the total is invalid`,
    },
    // Known metadata bug: the formulas read a soil column that doesn't exist, the column is soil_carbon, so soil carbon is never checked and this case turns invalid once the metadata is fixed
    {
      cell: { ...cell, colName: 'soil_carbon' },
      data: [total('soil_carbon', '1000'), ...data('soil_carbon', ['402', '600'])],
      expected: undefined,
      name: `${equalToSum}: soil carbon sum over the total is valid`,
    },
  ]
}
