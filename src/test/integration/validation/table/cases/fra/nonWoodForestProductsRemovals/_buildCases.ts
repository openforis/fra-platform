import { ColName } from 'meta/assessment/col'
import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

type Props = {
  variableName: VariableName
}

const tableName = TableNames.nonWoodForestProductsRemovals

// The message names the category column for both the product name and the category
const columnEmpty = {
  messages: [
    {
      key: 'generalValidation.columnEmpty',
      name: ValidatorName.nwfpProductAndCategory,
      params: { columName: { key: 'nonWoodForestProductsRemovals.category' } },
    },
  ],
  valid: false,
}

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildCases = (props: Props): Array<TableValidationTestCase> => {
  const { variableName } = props
  const productNameCell = { colName: 'product_name', tableName, variableName }
  const categoryCell = { colName: 'category', tableName, variableName }
  const productName = `${ValidatorName.nwfpProductAndCategory} (${variableName} product_name)`
  const category = `${ValidatorName.nwfpProductAndCategory} (${variableName} category)`

  const datum = (colName: ColName, raw: string): NodeUpdate => ({
    colName,
    tableName,
    value: { raw },
    variableName,
  })

  return [
    // Nothing reported yet is valid
    {
      cell: productNameCell,
      data: [],
      expected: undefined,
      name: `${productName}: empty data is valid`,
    },
    {
      cell: productNameCell,
      data: [datum('product_name', 'Mushrooms')],
      expected: undefined,
      name: `${productName}: only the product name reported is valid`,
    },
    // Once another column of the product is reported the product name can't be empty
    {
      cell: productNameCell,
      data: [datum('key_species', 'Boletus edulis')],
      expected: columnEmpty,
      name: `${productName}: empty product name with key species is invalid`,
    },
    // A quantity of 0 counts as reported
    {
      cell: productNameCell,
      data: [datum('quantity', '0')],
      expected: columnEmpty,
      name: `${productName}: empty product name with a quantity of 0 is invalid`,
    },
    {
      cell: productNameCell,
      data: [datum('unit', 'tonnes')],
      expected: columnEmpty,
      name: `${productName}: empty product name with unit is invalid`,
    },
    {
      cell: productNameCell,
      data: [datum('value', '1000')],
      expected: columnEmpty,
      name: `${productName}: empty product name with value is invalid`,
    },
    {
      cell: productNameCell,
      data: [datum('category', 'food')],
      expected: columnEmpty,
      name: `${productName}: empty product name with category is invalid`,
    },
    {
      cell: productNameCell,
      data: [datum('product_name', 'Mushrooms'), datum('key_species', 'Boletus edulis')],
      expected: undefined,
      name: `${productName}: product name with key species is valid`,
    },
    // The same cases for the category column
    {
      cell: categoryCell,
      data: [],
      expected: undefined,
      name: `${category}: empty data is valid`,
    },
    {
      cell: categoryCell,
      data: [datum('category', 'food')],
      expected: undefined,
      name: `${category}: only the category reported is valid`,
    },
    // Once another column of the product is reported the category can't be empty
    {
      cell: categoryCell,
      data: [datum('key_species', 'Boletus edulis')],
      expected: columnEmpty,
      name: `${category}: empty category with key species is invalid`,
    },
    {
      cell: categoryCell,
      data: [datum('quantity', '0')],
      expected: columnEmpty,
      name: `${category}: empty category with a quantity of 0 is invalid`,
    },
    {
      cell: categoryCell,
      data: [datum('unit', 'tonnes')],
      expected: columnEmpty,
      name: `${category}: empty category with unit is invalid`,
    },
    {
      cell: categoryCell,
      data: [datum('value', '1000')],
      expected: columnEmpty,
      name: `${category}: empty category with value is invalid`,
    },
    {
      cell: categoryCell,
      data: [datum('product_name', 'Mushrooms')],
      expected: columnEmpty,
      name: `${category}: empty category with product name is invalid`,
    },
    {
      cell: categoryCell,
      data: [datum('category', 'food'), datum('key_species', 'Boletus edulis')],
      expected: undefined,
      name: `${category}: category with key species is valid`,
    },
  ]
}
