import { ColName } from 'meta/assessment/col'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_4_2a'
const colName = 'natural_expansion_and_natural_regeneration'
const variableName = 'forest_1990'
const cell = { colName, tableName, variableName }
const categories: Array<ColName> = [
  'natural_expansion_and_natural_regeneration',
  'afforestation_and_regeneration_by_planting_and_or_seeding',
]

const datum = (raw: string, col = colName): NodeUpdate => ({ ...cell, colName: col, value: { raw } })

const data = (raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(raws[index], category))

const forestArea = (raw: string): NodeUpdate => ({
  colName: 'area',
  tableName: 'table_1_1a',
  value: { raw },
  variableName,
})

const differentFromForestArea = (parentValue: number, categoriesSum: number): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.sumSubCategoriesNotEqualToParent',
      name: ValidatorName.sumSubCategoriesNotEqualToParent,
      params: {
        categoriesSum: Numbers.format(categoriesSum),
        categoryLabelKeys: [
          'panEuropean.totalForestAreaByExpansionAndRegenerationType.forestAreaByExpansionAndRegenerationSubcategories',
        ],
        parentLabelKey: 'panEuropean.forestArea.forest',
        parentLabelParams: '{"year":"1990"}',
        parentTableAnchor: '1.1I',
        parentValue: Numbers.format(parentValue),
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
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty data is valid`,
  },
  // Empty forest area skips the validation
  {
    cell,
    data: data(['600', '400']),
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty forest area is valid`,
  },
  // Empty categories skip the validation
  {
    cell,
    data: [forestArea('1000')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty expansion and regeneration categories are valid`,
  },
  {
    cell,
    data: [forestArea('0')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: forest area of 0 without categories is valid`,
  },
  // One empty category skips the validation even when the other exceeds the forest area
  {
    cell,
    data: [forestArea('1000'), datum('1100', 'afforestation_and_regeneration_by_planting_and_or_seeding')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty natural expansion and regeneration is valid`,
  },
  {
    cell,
    data: [forestArea('1000'), datum('1100')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty afforestation and regeneration by planting or seeding is valid`,
  },
  {
    cell,
    data: [forestArea('1000'), ...data(['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum equal to the forest area is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [forestArea('1000'), ...data(['601', '400'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum one unit over the forest area is valid`,
  },
  // A sum more than one unit over or below the forest area is invalid
  {
    cell,
    data: [forestArea('1000'), ...data(['602', '400'])],
    expected: differentFromForestArea(1000, 1002),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum over the forest area is invalid`,
  },
  {
    cell,
    data: [forestArea('1000'), ...data(['590', '400'])],
    expected: differentFromForestArea(1000, 990),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum below the forest area is invalid`,
  },
  // Coppice is an "of which" category, so its area isn't added again
  {
    cell,
    data: [forestArea('1000'), ...data(['600', '400']), datum('200', 'coppice')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum equal to the forest area with coppice is valid`,
  },
  // Reported zeroes count as values, so zero categories match a forest area of 0
  {
    cell,
    data: [forestArea('0'), ...data(['0', '0'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: all zero values are valid`,
  },
  {
    cell,
    data: [forestArea('0'), ...data(['2', '0'])],
    expected: differentFromForestArea(0, 2),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum over a forest area of 0 is invalid`,
  },
  // Afforestation and regeneration by planting or seeding is checked against the same forest area
  {
    cell: { ...cell, colName: 'afforestation_and_regeneration_by_planting_and_or_seeding' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty data is valid for afforestation and regeneration by planting or seeding`,
  },
  {
    cell: { ...cell, colName: 'afforestation_and_regeneration_by_planting_and_or_seeding' },
    data: [forestArea('0')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: forest area of 0 without categories is valid for afforestation and regeneration by planting or seeding`,
  },
  {
    cell: { ...cell, colName: 'afforestation_and_regeneration_by_planting_and_or_seeding' },
    data: [forestArea('1000'), ...data(['600', '400'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: afforestation and regeneration by planting or seeding sum equal to the forest area is valid`,
  },
  {
    cell: { ...cell, colName: 'afforestation_and_regeneration_by_planting_and_or_seeding' },
    data: [forestArea('1000'), ...data(['600', '402'])],
    expected: differentFromForestArea(1000, 1002),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: afforestation and regeneration by planting or seeding sum over the forest area is invalid`,
  },
]
