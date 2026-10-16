import { ColName } from 'meta/assessment/col'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'

import { TableValidationTestCase } from '../../../types'

const tableName = 'table_4_3b'
const colName = 'naturally_established'
const variableName = 'forest_1990'
const cell = { colName, tableName, variableName }
const subclasses: Array<ColName> = [
  'naturally_established',
  'naturalised_introduced_species',
  'established_by_planting_and_or_seeding',
  'coppice',
  'unknown_origin',
]

const datum = (raw: string | null, col = colName): NodeUpdate => ({ ...cell, colName: col, value: { raw } })

const data = (raws: Array<string>): Array<NodeUpdate> =>
  subclasses.map((subclass, index) => datum(raws[index], subclass))

const semiNatural = (raw: string): NodeUpdate => ({
  colName: 'semi_natural',
  tableName: 'table_4_3a',
  value: { raw },
  variableName: 'forest_1990',
})

const differentFromSemiNatural = (parentValue: number, categoriesSum: number): TableValidationTestCase['expected'] => ({
  messages: [
    {
      key: 'generalValidation.sumSubCategoriesNotEqualToParent',
      name: ValidatorName.sumSubCategoriesNotEqualToParent,
      params: {
        categoriesSum: Numbers.format(categoriesSum),
        categoryLabelKeys: ['panEuropean.naturalnessBySubclasses.semiNaturalSubclasses'],
        parentColLabelKey: 'panEuropean.naturalness.semi_natural',
        parentLabelKey: 'panEuropean.naturalness.forest',
        parentLabelParams: '{"year":"1990"}',
        parentTableAnchor: '4.3I',
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
  // Empty semi natural forest skips the validation
  {
    cell,
    data: data(['400', '300', '200', '50', '50']),
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty semi natural forest is valid`,
  },
  // Empty subclasses skip the validation
  {
    cell,
    data: [semiNatural('1000')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty subclasses are valid`,
  },
  {
    cell,
    data: [semiNatural('0')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: semi natural forest of 0 without subclasses is valid`,
  },
  // One empty subclass skips the validation even when the other four add up to 600 instead of the 1000 semi natural forest
  ...subclasses.map<TableValidationTestCase>((emptySubclass) => ({
    cell,
    data: [
      semiNatural('1000'),
      ...subclasses.map((subclass) => datum(subclass === emptySubclass ? null : '150', subclass)),
    ],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty ${emptySubclass} is valid`,
  })),
  {
    cell,
    data: [semiNatural('1000'), ...data(['400', '300', '200', '50', '50'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum equal to the semi natural forest is valid`,
  },
  // The sum allows one unit of tolerance
  {
    cell,
    data: [semiNatural('1000'), ...data(['401', '300', '200', '50', '50'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum one unit over the semi natural forest is valid`,
  },
  // A sum more than one unit over or below the semi natural forest is invalid
  {
    cell,
    data: [semiNatural('1000'), ...data(['402', '300', '200', '50', '50'])],
    expected: differentFromSemiNatural(1000, 1002),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum over the semi natural forest is invalid`,
  },
  {
    cell,
    data: [semiNatural('1000'), ...data(['390', '300', '200', '50', '50'])],
    expected: differentFromSemiNatural(1000, 990),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum below the semi natural forest is invalid`,
  },
  // Reported zeroes count as values, so zero subclasses match a semi natural forest of 0
  {
    cell,
    data: [semiNatural('0'), ...data(['0', '0', '0', '0', '0'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: all zero values are valid`,
  },
  {
    cell,
    data: [semiNatural('0'), ...data(['2', '0', '0', '0', '0'])],
    expected: differentFromSemiNatural(0, 2),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: sum over a semi natural forest of 0 is invalid`,
  },
  // The other subclasses are checked the same way against the same semi natural forest
  {
    cell: { ...cell, colName: 'naturalised_introduced_species' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty data is valid for naturalised introduced species`,
  },
  {
    cell: { ...cell, colName: 'naturalised_introduced_species' },
    data: [semiNatural('0')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: semi natural forest of 0 without subclasses is valid for naturalised introduced species`,
  },
  {
    cell: { ...cell, colName: 'naturalised_introduced_species' },
    data: [semiNatural('1000'), ...data(['400', '300', '200', '50', '50'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: naturalised introduced species sum equal to the semi natural forest is valid`,
  },
  {
    cell: { ...cell, colName: 'naturalised_introduced_species' },
    data: [semiNatural('1000'), ...data(['400', '302', '200', '50', '50'])],
    expected: differentFromSemiNatural(1000, 1002),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: naturalised introduced species sum over the semi natural forest is invalid`,
  },
  {
    cell: { ...cell, colName: 'established_by_planting_and_or_seeding' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty data is valid for established by planting or seeding`,
  },
  {
    cell: { ...cell, colName: 'established_by_planting_and_or_seeding' },
    data: [semiNatural('0')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: semi natural forest of 0 without subclasses is valid for established by planting or seeding`,
  },
  {
    cell: { ...cell, colName: 'established_by_planting_and_or_seeding' },
    data: [semiNatural('1000'), ...data(['400', '300', '200', '50', '50'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: established by planting or seeding sum equal to the semi natural forest is valid`,
  },
  {
    cell: { ...cell, colName: 'established_by_planting_and_or_seeding' },
    data: [semiNatural('1000'), ...data(['400', '300', '202', '50', '50'])],
    expected: differentFromSemiNatural(1000, 1002),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: established by planting or seeding sum over the semi natural forest is invalid`,
  },
  {
    cell: { ...cell, colName: 'coppice' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty data is valid for coppice`,
  },
  {
    cell: { ...cell, colName: 'coppice' },
    data: [semiNatural('0')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: semi natural forest of 0 without subclasses is valid for coppice`,
  },
  {
    cell: { ...cell, colName: 'coppice' },
    data: [semiNatural('1000'), ...data(['400', '300', '200', '50', '50'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: coppice sum equal to the semi natural forest is valid`,
  },
  {
    cell: { ...cell, colName: 'coppice' },
    data: [semiNatural('1000'), ...data(['400', '300', '200', '52', '50'])],
    expected: differentFromSemiNatural(1000, 1002),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: coppice sum over the semi natural forest is invalid`,
  },
  {
    cell: { ...cell, colName: 'unknown_origin' },
    data: [],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: empty data is valid for unknown origin`,
  },
  {
    cell: { ...cell, colName: 'unknown_origin' },
    data: [semiNatural('0')],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: semi natural forest of 0 without subclasses is valid for unknown origin`,
  },
  {
    cell: { ...cell, colName: 'unknown_origin' },
    data: [semiNatural('1000'), ...data(['400', '300', '200', '50', '50'])],
    expected: undefined,
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: unknown origin sum equal to the semi natural forest is valid`,
  },
  {
    cell: { ...cell, colName: 'unknown_origin' },
    data: [semiNatural('1000'), ...data(['400', '300', '200', '50', '52'])],
    expected: differentFromSemiNatural(1000, 1002),
    name: `${ValidatorName.sumSubCategoriesNotEqualToParent}: unknown origin sum over the semi natural forest is invalid`,
  },
]
