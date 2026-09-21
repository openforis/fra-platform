import { ColName } from 'meta/assessment/col'
import { NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../../types'

type Props = {
  variableName: VariableName
}

const tableName = TableNames.disturbances
const colName = '2000'
// Extent of forest has no annual columns, so a year without a forest area falls back to maxForestArea()
const fallbackColName = '2001'
const disturbances: Array<VariableName> = ['insects', 'diseases', 'severe_weather_events', 'other']

const datum = (variableName: VariableName, raw: string, col = colName): NodeUpdate => ({
  colName: col,
  tableName,
  value: { raw },
  variableName,
})

const forestArea = (raw: string, col = colName): NodeUpdate => ({
  colName: col,
  tableName: TableNames.extentOfForest,
  value: { raw },
  variableName: 'forestArea',
})

const exceedsForest: NodeValueValidationMessage = {
  key: 'generalValidation.forestAreaExceedsExtentOfForest',
  name: ValidatorName.notGreaterThanForest,
  params: { value: '22409.00' },
}

const exceedsMaxForest: NodeValueValidationMessage = {
  key: 'generalValidation.valueCannotExceedMaximumValueReportedForForestArea',
  name: ValidatorName.notGreaterThanMaxForest,
  params: { maxForestArea: '22409.00' },
}

const sumExceedsForest = (year: ColName): NodeValueValidationMessage => ({
  key: 'generalValidation.valueCannotExceedMaximumValueReportedForForestAreaYear',
  name: ValidatorName.colSumNotGreaterThanForest,
  params: { maxForestArea: '22409.00', year },
})

// All rows carry the same formulas, so the cases only differ by the cell under test
export const buildCases = (props: Props): Array<TableValidationTestCase> => {
  const { variableName } = props
  const cell = { colName, tableName, variableName }
  const fallbackCell = { ...cell, colName: fallbackColName }
  const notGreaterThan = `${ValidatorName.notGreaterThanForestOrMaxForest} (${variableName})`
  const colSum = `${ValidatorName.colSumNotGreaterThanForest} (${variableName})`

  // Build the other three disturbances with 6000 each (18000 total) and test the column sum against the 22409 forest area
  const otherDisturbances = disturbances.reduce<Array<NodeUpdate>>((acc, disturbance) => {
    if (disturbance !== variableName) acc.push(datum(disturbance, '6000'))
    return acc
  }, [])

  return [
    // Nothing reported yet is valid
    {
      cell,
      data: [],
      expected: undefined,
      name: `${notGreaterThan}: empty data is valid`,
    },
    // Without any forest area, the year and the maximum can't be checked
    {
      cell,
      data: [datum(variableName, '300')],
      expected: undefined,
      name: `${notGreaterThan}: empty extent of forest is valid`,
    },
    // Empty disturbances skip the check and sum to zero
    {
      cell,
      data: [forestArea('22409')],
      expected: undefined,
      name: `${notGreaterThan}: empty disturbances are valid`,
    },
    {
      cell,
      data: [forestArea('22409'), datum(variableName, '300')],
      expected: undefined,
      name: `${notGreaterThan}: disturbance within the forest area is valid`,
    },
    // Empty disturbances count as 0 in the column sum, so both validations allow one unit over the forest area
    {
      cell,
      data: [forestArea('22409'), datum(variableName, '22410')],
      expected: undefined,
      name: `${notGreaterThan}: disturbance one unit over the forest area is valid`,
    },
    // Over the forest area, both the disturbance and the column sum fail, so we get both messages
    {
      cell,
      data: [forestArea('22409'), datum(variableName, '22411')],
      expected: { messages: [exceedsForest, sumExceedsForest(colName)], valid: false },
      name: `${notGreaterThan}: disturbance over the forest area is invalid`,
    },
    // A year without a forest area is checked against the maximum forest area of the other years
    {
      cell: fallbackCell,
      data: [forestArea('22409'), forestArea('22000', '2020'), datum(variableName, '22409', fallbackColName)],
      expected: undefined,
      name: `${notGreaterThan}: disturbance within the maximum forest area is valid`,
    },
    {
      cell: fallbackCell,
      data: [forestArea('22409'), forestArea('22000', '2020'), datum(variableName, '22411', fallbackColName)],
      expected: { messages: [exceedsMaxForest, sumExceedsForest(fallbackColName)], valid: false },
      name: `${notGreaterThan}: disturbance over the maximum forest area is invalid`,
    },
    // The column sum can be equal to the forest area
    {
      cell,
      data: [forestArea('22409'), ...otherDisturbances, datum(variableName, '4409')],
      expected: undefined,
      name: `${colSum}: column sum equal to the forest area is valid`,
    },
    {
      cell,
      data: [forestArea('22409'), ...otherDisturbances, datum(variableName, '4410')],
      expected: undefined,
      name: `${colSum}: column sum one unit over the forest area is valid`,
    },
    // Each disturbance is within the forest area, only the column sum is over it
    {
      cell,
      data: [forestArea('22409'), ...otherDisturbances, datum(variableName, '4411')],
      expected: { messages: [sumExceedsForest(colName)], valid: false },
      name: `${colSum}: column sum over the forest area is invalid`,
    },
  ]
}
