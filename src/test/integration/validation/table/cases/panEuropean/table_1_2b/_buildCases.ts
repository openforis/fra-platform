import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

type Props = {
  variableName: VariableName
}

const tableName = 'table_1_2b'
const colName = 'growing_stock_1990'
const forestTypes: Array<VariableName> = [
  'predominantly_coniferous_forest',
  'predominantly_broadleaved_forest',
  'mixed_forest',
]

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const data = (raws: Array<string>): Array<NodeUpdate> =>
  forestTypes.map((forestType, index) => datum(forestType, raws[index]))

const growingStock = (raw: string): NodeUpdate => ({
  colName: 'total',
  tableName: 'table_1_2a',
  value: { raw },
  variableName: 'forest_1990',
})

const differentFromGrowingStock = (valueRounded: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.valueEqualToSumParent',
      name: ValidatorName.equalToSum,
      params: {
        parentCol: { key: 'panEuropean.growingStock.total' },
        parentTable: '1.2.I',
        parentVariable: { key: 'Forest' },
        subcategories: [
          { key: 'panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest' },
          { key: 'panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest' },
          { key: 'panEuropean.forestAreaByForestTypes.mixed_forest' },
        ],
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

  return [
    // Nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${equalToSum}: empty data is valid`,
    },
    // Empty growing stock skips the validation
    {
      cell,
      data: data(['600', '300', '100']),
      expected: undefined,
      name: `${equalToSum}: empty growing stock is valid`,
    },
    {
      cell,
      data: [growingStock('1000')],
      expected: differentFromGrowingStock('1000.00'),
      name: `${equalToSum}: growing stock without forest types is invalid`,
    },
    // Empty forest types don't count as 0, so not even a growing stock of 0 matches them
    {
      cell,
      data: [growingStock('0')],
      expected: differentFromGrowingStock('0.00'),
      name: `${equalToSum}: growing stock of 0 without forest types is invalid`,
    },
    // Empty forest types are left out of the sum
    {
      cell,
      data: [
        growingStock('1000'),
        ...forestTypes.map((forestType) => datum(forestType, forestType === variableName ? '' : '500')),
      ],
      expected: undefined,
      name: `${equalToSum}: empty ${variableName} is valid`,
    },
    {
      cell,
      data: [growingStock('1000'), datum(variableName, '1000')],
      expected: undefined,
      name: `${equalToSum}: only ${variableName} equal to the growing stock is valid`,
    },
    {
      cell,
      data: [growingStock('1000'), ...data(['600', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: sum equal to the growing stock is valid`,
    },
    // The sum allows one unit of tolerance
    {
      cell,
      data: [growingStock('1000'), ...data(['601', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: sum one unit over the growing stock is valid`,
    },
    // A sum more than one unit over or below the growing stock is invalid
    {
      cell,
      data: [growingStock('1000'), ...data(['602', '300', '100'])],
      expected: differentFromGrowingStock('1000.00'),
      name: `${equalToSum}: sum over the growing stock is invalid`,
    },
    {
      cell,
      data: [growingStock('1000'), ...data(['590', '300', '100'])],
      expected: differentFromGrowingStock('1000.00'),
      name: `${equalToSum}: sum below the growing stock is invalid`,
    },
    // Reported zeroes count as values, so zero forest types match a growing stock of 0
    {
      cell,
      data: [growingStock('0'), ...data(['0', '0', '0'])],
      expected: undefined,
      name: `${equalToSum}: all zero values are valid`,
    },
    {
      cell,
      data: [growingStock('0'), datum(variableName, '2')],
      expected: differentFromGrowingStock('0.00'),
      name: `${equalToSum}: over a growing stock of 0 is invalid`,
    },
  ]
}
