import { ColName } from 'meta/assessment/col'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

type Props = {
  variableName: VariableName
}

const tableName = 'table_6_1'
const colName = 'total_forest_area'
const ownerships: Array<VariableName> = [
  'in_private_ownership_1990',
  'in_public_ownership_1990',
  'other_types_of_ownership_unknown_1990',
]
const areaClasses: Array<ColName> = ['less_10_ha_area', '_11_500_ha_area', 'more_500_ha_area']
const numberClasses: Array<ColName> = ['less_10_ha_number', '_11_500_ha_number', 'more_500_ha_number']

const datum = (name: VariableName, raw: string, col = colName): NodeUpdate => ({
  colName: col,
  tableName,
  value: { raw },
  variableName: name,
})

const forestArea = (raw: string): NodeUpdate => ({
  colName: 'area',
  tableName: 'table_1_1a',
  value: { raw },
  variableName: 'forest_1990',
})

// The metadata lists the label keys in a different order than the cells, public before private
const differentFromForestArea = (valueRounded: string): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.valueEqualToSumParent',
      name: ValidatorName.equalToSum,
      params: {
        parentCol: { key: 'panEuropean.forestArea.area1000Ha' },
        parentTable: '1.1a',
        parentVariable: { key: 'panEuropean.forestHoldings.forest' },
        subcategories: [
          { key: 'panEuropean.forestHoldings.public_ownership' },
          { key: 'panEuropean.forestHoldings.private_ownership' },
          { key: 'panEuropean.forestHoldings.other' },
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
  const ownerData = (raws: Array<string>): Array<NodeUpdate> =>
    ownerships.map((owner, index) => datum(owner, raws[index]))
  const areaData = (raws: Array<string>): Array<NodeUpdate> =>
    areaClasses.map((areaClass, index) => datum(variableName, raws[index], areaClass))
  const numberData = (raws: Array<string>): Array<NodeUpdate> =>
    numberClasses.map((numberClass, index) => datum(variableName, raws[index], numberClass))

  // The metadata passes the parent as a raw cell reference, which the message shows as it is
  const differentFromTotal = (parentVariable: string, valueRounded: string): TableValidationTestCase['expected'] => ({
    messages: [
      {
        key: 'generalValidation.valueEqualToSumParent',
        name: ValidatorName.equalToSum,
        params: {
          parentCol: { key: '' },
          parentTable: '',
          parentVariable: { key: parentVariable },
          subcategories: '',
          valueRounded,
        },
      },
    ],
    valid: false,
  })
  const differentFromTotalForestArea = (valueRounded: string): TableValidationTestCase['expected'] =>
    differentFromTotal(`table_6_1.${variableName}[total_forest_area]`, valueRounded)
  // The holdings formulas even leave the table_ prefix out of the reference
  const differentFromTotalHoldings = (valueRounded: string): TableValidationTestCase['expected'] =>
    differentFromTotal(`6_1.${variableName}[total_number_of_holdings]`, valueRounded)

  return [
    // Nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${equalToSum}: empty data is valid`,
    },
    // Empty forest area skips the validation
    {
      cell,
      data: ownerData(['600', '300', '100']),
      expected: undefined,
      name: `${equalToSum}: empty forest area is valid`,
    },
    {
      cell,
      data: [forestArea('1000')],
      expected: differentFromForestArea('1000.00'),
      name: `${equalToSum}: forest area without ownerships is invalid`,
    },
    // Empty ownerships don't count as 0, so not even a forest area of 0 matches them
    {
      cell,
      data: [forestArea('0')],
      expected: differentFromForestArea('0.00'),
      name: `${equalToSum}: forest area of 0 without ownerships is invalid`,
    },
    // Empty ownerships are left out of the sum
    {
      cell,
      data: [forestArea('1000'), datum(variableName, '1000')],
      expected: undefined,
      name: `${equalToSum}: only ${variableName} equal to the forest area is valid`,
    },
    {
      cell,
      data: [forestArea('1000'), ...ownerships.map((owner) => datum(owner, owner === variableName ? '' : '500'))],
      expected: undefined,
      name: `${equalToSum}: empty ${variableName} with the other ownerships equal to the forest area is valid`,
    },
    {
      cell,
      data: [forestArea('1000'), ...ownerData(['600', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: sum equal to the forest area is valid`,
    },
    // The sum allows one unit of tolerance
    {
      cell,
      data: [forestArea('1000'), ...ownerData(['601', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: sum one unit over the forest area is valid`,
    },
    // A sum more than one unit over or below the forest area is invalid
    {
      cell,
      data: [forestArea('1000'), ...ownerData(['602', '300', '100'])],
      expected: differentFromForestArea('1000.00'),
      name: `${equalToSum}: sum over the forest area is invalid`,
    },
    {
      cell,
      data: [forestArea('1000'), ...ownerData(['590', '300', '100'])],
      expected: differentFromForestArea('1000.00'),
      name: `${equalToSum}: sum below the forest area is invalid`,
    },
    // Reported zeroes count as values, so zero ownerships match a forest area of 0
    {
      cell,
      data: [forestArea('0'), ...ownerData(['0', '0', '0'])],
      expected: undefined,
      name: `${equalToSum}: all zero values are valid`,
    },
    {
      cell,
      data: [forestArea('0'), datum(variableName, '2')],
      expected: differentFromForestArea('0.00'),
      name: `${equalToSum}: over a forest area of 0 is invalid`,
    },
    // The area size classes add up to the total forest area of the row
    {
      cell: { ...cell, colName: 'less_10_ha_area' },
      data: [],
      expected: undefined,
      name: `${equalToSum}: empty data is valid for the area under 10 ha`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_area' },
      data: areaData(['600', '300', '100']),
      expected: undefined,
      name: `${equalToSum}: empty total forest area is valid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_area' },
      data: [datum(variableName, '1000')],
      expected: differentFromTotalForestArea('1000.00'),
      name: `${equalToSum}: total forest area without size classes is invalid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_area' },
      data: [datum(variableName, '0')],
      expected: differentFromTotalForestArea('0.00'),
      name: `${equalToSum}: total forest area of 0 without size classes is invalid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_area' },
      data: [datum(variableName, '600'), datum(variableName, '600', 'less_10_ha_area')],
      expected: undefined,
      name: `${equalToSum}: only the area under 10 ha equal to the total forest area is valid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_area' },
      data: [datum(variableName, '1000'), ...areaData(['600', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: area sum equal to the total forest area is valid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_area' },
      data: [datum(variableName, '1000'), ...areaData(['601', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: area sum one unit over the total forest area is valid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_area' },
      data: [datum(variableName, '1000'), ...areaData(['602', '300', '100'])],
      expected: differentFromTotalForestArea('1000.00'),
      name: `${equalToSum}: area sum over the total forest area is invalid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_area' },
      data: [datum(variableName, '1000'), ...areaData(['590', '300', '100'])],
      expected: differentFromTotalForestArea('1000.00'),
      name: `${equalToSum}: area sum below the total forest area is invalid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_area' },
      data: [datum(variableName, '0'), ...areaData(['0', '0', '0'])],
      expected: undefined,
      name: `${equalToSum}: all zero areas are valid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_area' },
      data: [datum(variableName, '0'), datum(variableName, '2', 'less_10_ha_area')],
      expected: differentFromTotalForestArea('0.00'),
      name: `${equalToSum}: area over a total forest area of 0 is invalid`,
    },
    // The other area size classes are checked the same way
    {
      cell: { ...cell, colName: '_11_500_ha_area' },
      data: [],
      expected: undefined,
      name: `${equalToSum}: empty data is valid for the area between 11 and 500 ha`,
    },
    {
      cell: { ...cell, colName: '_11_500_ha_area' },
      data: [datum(variableName, '0')],
      expected: differentFromTotalForestArea('0.00'),
      name: `${equalToSum}: total forest area of 0 without size classes is invalid for the area between 11 and 500 ha`,
    },
    {
      cell: { ...cell, colName: '_11_500_ha_area' },
      data: [datum(variableName, '1000'), ...areaData(['600', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: area between 11 and 500 ha sum equal to the total forest area is valid`,
    },
    {
      cell: { ...cell, colName: '_11_500_ha_area' },
      data: [datum(variableName, '1000'), ...areaData(['600', '302', '100'])],
      expected: differentFromTotalForestArea('1000.00'),
      name: `${equalToSum}: area between 11 and 500 ha sum over the total forest area is invalid`,
    },
    {
      cell: { ...cell, colName: 'more_500_ha_area' },
      data: [],
      expected: undefined,
      name: `${equalToSum}: empty data is valid for the area over 500 ha`,
    },
    {
      cell: { ...cell, colName: 'more_500_ha_area' },
      data: [datum(variableName, '0')],
      expected: differentFromTotalForestArea('0.00'),
      name: `${equalToSum}: total forest area of 0 without size classes is invalid for the area over 500 ha`,
    },
    {
      cell: { ...cell, colName: 'more_500_ha_area' },
      data: [datum(variableName, '1000'), ...areaData(['600', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: area over 500 ha sum equal to the total forest area is valid`,
    },
    {
      cell: { ...cell, colName: 'more_500_ha_area' },
      data: [datum(variableName, '1000'), ...areaData(['600', '300', '102'])],
      expected: differentFromTotalForestArea('1000.00'),
      name: `${equalToSum}: area over 500 ha sum over the total forest area is invalid`,
    },
    // The holdings size classes add up to the total number of holdings of the row
    {
      cell: { ...cell, colName: 'less_10_ha_number' },
      data: [],
      expected: undefined,
      name: `${equalToSum}: empty data is valid for the holdings under 10 ha`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_number' },
      data: numberData(['600', '300', '100']),
      expected: undefined,
      name: `${equalToSum}: empty total number of holdings is valid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_number' },
      data: [datum(variableName, '1000', 'total_number_of_holdings')],
      expected: differentFromTotalHoldings('1000.00'),
      name: `${equalToSum}: total number of holdings without size classes is invalid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_number' },
      data: [datum(variableName, '0', 'total_number_of_holdings')],
      expected: differentFromTotalHoldings('0.00'),
      name: `${equalToSum}: total number of holdings of 0 without size classes is invalid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_number' },
      data: [datum(variableName, '600', 'total_number_of_holdings'), datum(variableName, '600', 'less_10_ha_number')],
      expected: undefined,
      name: `${equalToSum}: only the holdings under 10 ha equal to the total number of holdings is valid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_number' },
      data: [datum(variableName, '1000', 'total_number_of_holdings'), ...numberData(['600', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: holdings sum equal to the total number of holdings is valid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_number' },
      data: [datum(variableName, '1000', 'total_number_of_holdings'), ...numberData(['601', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: holdings sum one unit over the total number of holdings is valid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_number' },
      data: [datum(variableName, '1000', 'total_number_of_holdings'), ...numberData(['602', '300', '100'])],
      expected: differentFromTotalHoldings('1000.00'),
      name: `${equalToSum}: holdings sum over the total number of holdings is invalid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_number' },
      data: [datum(variableName, '1000', 'total_number_of_holdings'), ...numberData(['590', '300', '100'])],
      expected: differentFromTotalHoldings('1000.00'),
      name: `${equalToSum}: holdings sum below the total number of holdings is invalid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_number' },
      data: [datum(variableName, '0', 'total_number_of_holdings'), ...numberData(['0', '0', '0'])],
      expected: undefined,
      name: `${equalToSum}: all zero holdings are valid`,
    },
    {
      cell: { ...cell, colName: 'less_10_ha_number' },
      data: [datum(variableName, '0', 'total_number_of_holdings'), datum(variableName, '2', 'less_10_ha_number')],
      expected: differentFromTotalHoldings('0.00'),
      name: `${equalToSum}: holdings over a total number of holdings of 0 is invalid`,
    },
    // The other holdings size classes are checked the same way
    {
      cell: { ...cell, colName: '_11_500_ha_number' },
      data: [],
      expected: undefined,
      name: `${equalToSum}: empty data is valid for the holdings between 11 and 500 ha`,
    },
    {
      cell: { ...cell, colName: '_11_500_ha_number' },
      data: [datum(variableName, '0', 'total_number_of_holdings')],
      expected: differentFromTotalHoldings('0.00'),
      name: `${equalToSum}: total number of holdings of 0 without size classes is invalid for the holdings between 11 and 500 ha`,
    },
    {
      cell: { ...cell, colName: '_11_500_ha_number' },
      data: [datum(variableName, '1000', 'total_number_of_holdings'), ...numberData(['600', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: holdings between 11 and 500 ha sum equal to the total number of holdings is valid`,
    },
    {
      cell: { ...cell, colName: '_11_500_ha_number' },
      data: [datum(variableName, '1000', 'total_number_of_holdings'), ...numberData(['600', '302', '100'])],
      expected: differentFromTotalHoldings('1000.00'),
      name: `${equalToSum}: holdings between 11 and 500 ha sum over the total number of holdings is invalid`,
    },
    {
      cell: { ...cell, colName: 'more_500_ha_number' },
      data: [],
      expected: undefined,
      name: `${equalToSum}: empty data is valid for the holdings over 500 ha`,
    },
    {
      cell: { ...cell, colName: 'more_500_ha_number' },
      data: [datum(variableName, '0', 'total_number_of_holdings')],
      expected: differentFromTotalHoldings('0.00'),
      name: `${equalToSum}: total number of holdings of 0 without size classes is invalid for the holdings over 500 ha`,
    },
    {
      cell: { ...cell, colName: 'more_500_ha_number' },
      data: [datum(variableName, '1000', 'total_number_of_holdings'), ...numberData(['600', '300', '100'])],
      expected: undefined,
      name: `${equalToSum}: holdings over 500 ha sum equal to the total number of holdings is valid`,
    },
    {
      cell: { ...cell, colName: 'more_500_ha_number' },
      data: [datum(variableName, '1000', 'total_number_of_holdings'), ...numberData(['600', '300', '102'])],
      expected: differentFromTotalHoldings('1000.00'),
      name: `${equalToSum}: holdings over 500 ha sum over the total number of holdings is invalid`,
    },
  ]
}
