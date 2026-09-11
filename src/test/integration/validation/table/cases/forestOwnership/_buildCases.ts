import { NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

type Props = {
  variableName: VariableName
}

const tableName = TableNames.forestOwnership
const colName = '1990'
const subCategories: Array<VariableName> = [
  'of_which_by_individuals',
  'of_which_by_private_businesses',
  'of_which_by_communities',
]

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const data = (raws: Array<string>): Array<NodeUpdate> =>
  subCategories.map((subCategory, index) => datum(subCategory, raws[index]))

const mustBeLessThanPrivateOwnership: NodeValueValidationMessage = {
  key: 'generalValidation.mustBeLessThanPrivateOwnership',
  name: ValidatorName.privateOwnership,
}
const mustBeEqualToPrivateOwnership: NodeValueValidationMessage = {
  key: 'generalValidation.mustBeEqualToPrivateOwnership',
  name: ValidatorName.privateOwnership,
}
const overPrivateOwnership = (maxValue: string): NodeValueValidationMessage => ({
  key: 'generalValidation.valueNotGreaterThan',
  name: ValidatorName.notGreaterThan,
  params: { maxValue },
})

// All three rows carry the same formulas, so the cases only differ by the cell under test
export const buildCases = (props: Props): Array<TableValidationTestCase> => {
  const { variableName } = props
  const cell = { colName, tableName, variableName }
  const privateOwnership = `${ValidatorName.privateOwnership} (${variableName})`
  const notGreaterThan = `${ValidatorName.notGreaterThan} (${variableName})`
  // The sub category left empty when only two are reported
  const emptySubCategory = subCategories.find((subCategory) => subCategory !== variableName)

  return [
    // Nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${privateOwnership}: empty data is valid`,
    },
    // Empty private ownership skips both validations
    {
      cell,
      data: data(['100', '100', '100']),
      expected: undefined,
      name: `${privateOwnership}: empty private ownership is valid`,
    },
    {
      cell,
      data: [datum('private_ownership', '1000')],
      expected: undefined,
      name: `${privateOwnership}: empty sub categories are valid`,
    },
    // With two sub categories empty nothing is checked against the private ownership
    {
      cell,
      data: [datum('private_ownership', '1000'), datum(variableName, '100')],
      expected: undefined,
      name: `${privateOwnership}: only one sub category reported is valid`,
    },
    // With one sub category empty the two reported have to stay below the private ownership
    {
      cell,
      data: [
        datum('private_ownership', '1000'),
        ...subCategories.map((subCategory) => datum(subCategory, subCategory === emptySubCategory ? '' : '300')),
      ],
      expected: undefined,
      name: `${privateOwnership}: two sub categories below the private ownership are valid`,
    },
    {
      cell,
      data: [
        datum('private_ownership', '1000'),
        ...subCategories.map((subCategory) => datum(subCategory, subCategory === emptySubCategory ? '' : '500')),
      ],
      expected: { messages: [mustBeLessThanPrivateOwnership], valid: false },
      name: `${privateOwnership}: two sub categories reaching the private ownership are invalid`,
    },
    // The sum check runs on the empty sub category too
    {
      cell,
      data: [
        datum('private_ownership', '1000'),
        ...subCategories.map((subCategory) => datum(subCategory, subCategory === variableName ? '' : '500')),
      ],
      expected: { messages: [mustBeLessThanPrivateOwnership], valid: false },
      name: `${privateOwnership}: empty sub category with the other two reaching the private ownership is invalid`,
    },
    // With all sub categories reported their sum has to be equal to the private ownership
    {
      cell,
      data: [datum('private_ownership', '1000'), ...data(['400', '300', '300'])],
      expected: undefined,
      name: `${privateOwnership}: sub categories equal to the private ownership are valid`,
    },
    // A sub category of 0 counts as reported, so the sum is checked instead of skipped
    {
      cell,
      data: [
        datum('private_ownership', '1000'),
        ...subCategories.map((subCategory) => datum(subCategory, subCategory === variableName ? '0' : '500')),
      ],
      expected: undefined,
      name: `${privateOwnership}: sub category of 0 with the sum equal to the private ownership is valid`,
    },
    // The sum allows one unit of tolerance
    {
      cell,
      data: [datum('private_ownership', '1000'), ...data(['401', '300', '300'])],
      expected: undefined,
      name: `${privateOwnership}: sub categories one unit over the private ownership are valid`,
    },
    {
      cell,
      data: [datum('private_ownership', '1000'), ...data(['402', '300', '300'])],
      expected: { messages: [mustBeEqualToPrivateOwnership], valid: false },
      name: `${privateOwnership}: sub categories over the private ownership are invalid`,
    },
    {
      cell,
      data: [datum('private_ownership', '1000'), ...data(['398', '300', '300'])],
      expected: { messages: [mustBeEqualToPrivateOwnership], valid: false },
      name: `${privateOwnership}: sub categories below the private ownership are invalid`,
    },
    // A private ownership of 0 skips the sum check, the sub category alone still can't be over it
    {
      cell,
      data: [datum('private_ownership', '0'), ...data(['100', '100', '100'])],
      expected: { messages: [overPrivateOwnership('0')], valid: false },
      name: `${privateOwnership}: private ownership of 0 skips the sum check`,
    },
    // The sub category check has no tolerance
    {
      cell,
      data: [datum('private_ownership', '1000'), datum(variableName, '1000')],
      expected: undefined,
      name: `${notGreaterThan}: sub category equal to the private ownership is valid`,
    },
    {
      cell,
      data: [datum('private_ownership', '1000'), datum(variableName, '1000.01')],
      expected: { messages: [overPrivateOwnership('1000')], valid: false },
      name: `${notGreaterThan}: sub category over the private ownership is invalid`,
    },
    // Over the private ownership with all sub categories reported, both validations fail, so we get both messages
    {
      cell,
      data: [
        datum('private_ownership', '1000'),
        ...subCategories.map((subCategory) => datum(subCategory, subCategory === variableName ? '1001' : '300')),
      ],
      expected: { messages: [mustBeEqualToPrivateOwnership, overPrivateOwnership('1000')], valid: false },
      name: `${notGreaterThan}: sub category over the private ownership with all sub categories reported fails both`,
    },
  ]
}
