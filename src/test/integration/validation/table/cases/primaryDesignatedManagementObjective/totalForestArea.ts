import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.primaryDesignatedManagementObjective
const colName = '1990'
const cell = { colName, tableName, variableName: 'totalForestArea' }
const categories: Array<VariableName> = [
  'production',
  'protection_of_soil_and_water',
  'conservation_of_biodiversity',
  'social_services',
  'multiple_use',
  'other',
  'no_designation',
  'unknown',
]

const datum = (variableName: VariableName, raw: string): NodeUpdate => ({
  colName,
  tableName,
  value: { raw },
  variableName,
})

const data = (raws: Array<string>): Array<NodeUpdate> =>
  categories.map((category, index) => datum(category, raws[index]))

const forestArea = (raw: string): NodeUpdate => ({
  colName,
  tableName: TableNames.extentOfForest,
  value: { raw },
  variableName: 'forestArea',
})

const invalid = {
  messages: [
    { key: 'generalValidation.forestSumAreaExceedsExtentOfForest', name: ValidatorName.sumNotGreaterThanForest },
  ],
  valid: false,
}

export const totalForestArea: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.sumNotGreaterThanForest}: empty data is valid`,
  },
  // Empty extent of forest skips the validation
  {
    cell,
    data: data(['3000', '3000', '3000', '3000', '3000', '3000', '3000', '3000']),
    expected: undefined,
    name: `${ValidatorName.sumNotGreaterThanForest}: empty extent of forest is valid`,
  },
  // Empty categories count as 0 in the sum
  {
    cell,
    data: [forestArea('22409')],
    expected: undefined,
    name: `${ValidatorName.sumNotGreaterThanForest}: empty categories are valid`,
  },
  {
    cell,
    data: [forestArea('22409'), ...data(['2000', '2000', '2000', '2000', '2000', '2000', '2000', '2000'])],
    expected: undefined,
    name: `${ValidatorName.sumNotGreaterThanForest}: sum within the forest area is valid`,
  },
  {
    cell,
    data: [forestArea('22409'), ...data(['3000', '3000', '3000', '3000', '3000', '3000', '3000', '1409'])],
    expected: undefined,
    name: `${ValidatorName.sumNotGreaterThanForest}: sum equal to the forest area is valid`,
  },
  // The check allows one unit of tolerance
  {
    cell,
    data: [forestArea('22409'), ...data(['3000', '3000', '3000', '3000', '3000', '3000', '3000', '1410'])],
    expected: undefined,
    name: `${ValidatorName.sumNotGreaterThanForest}: sum one unit over the forest area is valid`,
  },
  // Each category is within the forest area, only the sum is over it
  {
    cell,
    data: [forestArea('22409'), ...data(['3000', '3000', '3000', '3000', '3000', '3000', '3000', '1411'])],
    expected: invalid,
    name: `${ValidatorName.sumNotGreaterThanForest}: sum over the forest area is invalid`,
  },
  // A forest area of 0 counts as a value
  {
    cell,
    data: [forestArea('0'), datum('production', '2')],
    expected: invalid,
    name: `${ValidatorName.sumNotGreaterThanForest}: sum over a forest area of 0 is invalid`,
  },
]
