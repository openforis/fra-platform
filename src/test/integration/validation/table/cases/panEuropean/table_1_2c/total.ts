import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_1_2c'
const colName = 'growing_stock_in_forest_1990'
const variableName = 'total'
const cell = { colName, tableName, variableName }
const species: Array<VariableName> = [
  'no1_ranked_in_terms_of_volume',
  'no2_ranked_in_terms_of_volume',
  'no3_ranked_in_terms_of_volume',
  'no4_ranked_in_terms_of_volume',
  'no5_ranked_in_terms_of_volume',
  'no6_ranked_in_terms_of_volume',
  'no7_ranked_in_terms_of_volume',
  'no8_ranked_in_terms_of_volume',
  'no9_ranked_in_terms_of_volume',
  'no10_ranked_in_terms_of_volume',
  'remaining',
]

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const data = (raws: Array<string>): Array<NodeUpdate> => species.map((name, index) => datum(name, raws[index]))

const growingStock = (raw: string): NodeUpdate => ({
  colName: 'total',
  tableName: 'table_1_2a',
  value: { raw },
  variableName: 'forest_1990',
})

const differentFromGrowingStock = (
  parentValue: number,
  categoriesSum: number
): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.sumSubCategoriesNotEqualToParent',
      name: ValidatorName.sumSubCategoriesNotEqualToParent,
      params: {
        categoriesSum: Numbers.format(categoriesSum),
        categoryLabelKeys: [
          'panEuropean.growingStockComposition.noShort_ranked_in_terms_of_volume',
          'panEuropean.growingStockComposition.remaining',
        ],
        parentLabelKey: 'panEuropean.growingStock.forest',
        parentLabelParams: '{"year":"1990"}',
        parentTableAnchor: '1.2 I',
        parentValue: Numbers.format(parentValue),
      },
    },
  ],
  valid: false,
})

export const total: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty data is valid`,
  },
  // Empty growing stock skips the validation
  {
    cell,
    data: data(['100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100']),
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty growing stock is valid`,
  },
  // Empty species skip the validation
  {
    cell,
    data: [growingStock('1100')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty species are valid`,
  },
  // One empty species skips the validation even when the other ten add up to 1000 instead of the 1100 growing stock
  ...species.map<TableValidationTestCase>((emptySpecies) => ({
    cell,
    data: [growingStock('1100'), ...species.map((name) => datum(name, name === emptySpecies ? '' : '100'))],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty ${emptySpecies} is valid`,
  })),
  {
    cell,
    data: [
      growingStock('1100'),
      ...data(['100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100']),
    ],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum equal to the growing stock is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [
      growingStock('1100'),
      ...data(['101', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100']),
    ],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum one unit over the growing stock is valid`,
  },
  // A sum more than one unit over or below the growing stock is invalid
  {
    cell,
    data: [
      growingStock('1100'),
      ...data(['102', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100']),
    ],
    expected: differentFromGrowingStock(1100, 1102),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum over the growing stock is invalid`,
  },
  {
    cell,
    data: [growingStock('1100'), ...data(['90', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100'])],
    expected: differentFromGrowingStock(1100, 1090),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum below the growing stock is invalid`,
  },
  // A growing stock of 0 counts as a value
  {
    cell,
    data: [growingStock('0'), ...data(['2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'])],
    expected: differentFromGrowingStock(0, 2),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum over a growing stock of 0 is invalid`,
  },
]
