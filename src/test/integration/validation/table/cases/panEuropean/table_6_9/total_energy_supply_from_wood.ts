import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_6_9'
// The row carries one formula per year and unit, all alike, so only the 2007 TJ column is tested
const colName = 'tj_2007'
const variableName = 'total_energy_supply_from_wood'
const cell = { colName, tableName, variableName }
const sources: Array<VariableName> = [
  'energy_from_direct_wood_fibre_sources',
  'energy_from_co_products',
  'energy_from_processed_wood_based_fuels',
  'energy_from_post_consumer_recovered_wood',
  'energy_from_unknown_unspecified_sources',
]

const datum = (name: VariableName, raw: string, col = colName): NodeUpdate => ({
  colName: col,
  tableName,
  value: { raw },
  variableName: name,
})

const data = (raws: Array<string>): Array<NodeUpdate> => sources.map((source, index) => datum(source, raws[index]))

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

export const totalEnergySupplyFromWood: Array<TableValidationTestCase> = [
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
    data: data(['400', '300', '200', '50', '50']),
    expected: undefined,
    name: `${ValidatorName.equalToSum}: empty total energy supply is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000')],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: total energy supply without sources is invalid`,
  },
  // Empty sources don't count as 0, so not even a total of 0 matches them
  {
    cell,
    data: [datum(variableName, '0')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: total energy supply of 0 without sources is invalid`,
  },
  // Empty sources are left out of the sum
  {
    cell,
    data: [datum(variableName, '400'), datum('energy_from_direct_wood_fibre_sources', '400')],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: only direct wood fibre sources equal to the total energy supply is valid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(['400', '300', '200', '50', '50'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total energy supply is valid`,
  },
  // The of which rows are part of their sources and aren't added again
  {
    cell,
    data: [
      datum(variableName, '1000'),
      ...data(['400', '300', '200', '50', '50']),
      datum('of_which_from_forests', '300'),
      datum('of_which_from_other_wooded_land', '100'),
      datum('of_which_solid_residues', '300'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum equal to the total energy supply with the of which rows reported is valid`,
  },
  // Imported energy is only reported in dry matter, so it is checked on that column
  {
    cell: { ...cell, colName: '_1000_metric_tonnes_dry_matter_2007' },
    data: [
      datum(variableName, '1000', '_1000_metric_tonnes_dry_matter_2007'),
      ...sources.map((source, index) =>
        datum(source, ['400', '300', '200', '50', '50'][index], '_1000_metric_tonnes_dry_matter_2007')
      ),
      datum('of_which_imported', '200', '_1000_metric_tonnes_dry_matter_2007'),
    ],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: dry matter sum equal to the total energy supply with imported energy reported is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [datum(variableName, '1000'), ...data(['401', '300', '200', '50', '50'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: sum one unit over the total energy supply is valid`,
  },
  // A sum more than one unit over or below the total is invalid
  {
    cell,
    data: [datum(variableName, '1000'), ...data(['402', '300', '200', '50', '50'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum over the total energy supply is invalid`,
  },
  {
    cell,
    data: [datum(variableName, '1000'), ...data(['390', '300', '200', '50', '50'])],
    expected: differentFromTotal('1000.00'),
    name: `${ValidatorName.equalToSum}: sum below the total energy supply is invalid`,
  },
  // Reported zeroes count as values, so zero sources match a total of 0
  {
    cell,
    data: [datum(variableName, '0'), ...data(['0', '0', '0', '0', '0'])],
    expected: undefined,
    name: `${ValidatorName.equalToSum}: all zero values are valid`,
  },
  {
    cell,
    data: [datum(variableName, '0'), datum('energy_from_direct_wood_fibre_sources', '2')],
    expected: differentFromTotal('0.00'),
    name: `${ValidatorName.equalToSum}: over a total energy supply of 0 is invalid`,
  },
]
