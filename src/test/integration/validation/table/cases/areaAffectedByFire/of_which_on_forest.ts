import { TableNames } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.areaAffectedByFire
const colName = '2000'
// Extent of forest has no annual columns, so a fire year without a forest area falls back to maxForestArea()
const fallbackColName = '2001'
const variableName = 'of_which_on_forest'
const cell = { colName, tableName, variableName }
const fallbackCell = { ...cell, colName: fallbackColName }

const datum = (name: VariableName, raw: string, col = colName): NodeUpdate => ({
  colName: col,
  tableName,
  value: { raw },
  variableName: name,
})
const forestArea = (raw: string, col = colName): NodeUpdate => ({
  colName: col,
  tableName: TableNames.extentOfForest,
  value: { raw },
  variableName: 'forestArea',
})

const exceedsForest = {
  messages: [
    {
      key: 'generalValidation.forestAreaExceedsExtentOfForest',
      name: ValidatorName.notGreaterThanForest,
      params: { value: '22409.00' },
    },
  ],
  valid: false,
}
const exceedsMaxForest = {
  messages: [
    {
      key: 'generalValidation.valueCannotExceedMaximumValueReportedForForestArea',
      name: ValidatorName.notGreaterThanMaxForest,
      params: { maxForestArea: '22409.00' },
    },
  ],
  valid: false,
}
const exceedsTotal = {
  messages: [{ key: 'generalValidation.subCategoryExceedsParent', name: ValidatorName.subCategory }],
  valid: false,
}

export const ofWhichOnForest: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForestOrMaxForest}: empty data is valid`,
  },
  // Without any forest area, the year and the maximum can't be checked
  {
    cell,
    data: [datum('total_land_area_affected_by_fire', '500'), datum(variableName, '300')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForestOrMaxForest}: empty extent of forest is valid`,
  },
  // Empty area affected by fire skips both validations
  {
    cell,
    data: [forestArea('22409')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForestOrMaxForest}: empty area affected by fire is valid`,
  },
  {
    cell,
    data: [forestArea('22409'), datum('total_land_area_affected_by_fire', '500'), datum(variableName, '300')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForestOrMaxForest}: forest fire within the forest area is valid`,
  },
  // The forest area check allows one unit of tolerance
  {
    cell,
    data: [forestArea('22409'), datum('total_land_area_affected_by_fire', '30000'), datum(variableName, '22410')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForestOrMaxForest}: forest fire one unit over the forest area is valid`,
  },
  {
    cell,
    data: [forestArea('22409'), datum('total_land_area_affected_by_fire', '30000'), datum(variableName, '22411')],
    expected: exceedsForest,
    name: `${ValidatorName.notGreaterThanForestOrMaxForest}: forest fire over the forest area is invalid`,
  },
  // A year without a forest area is checked against the maximum forest area of the other years
  {
    cell: fallbackCell,
    data: [
      forestArea('22409'),
      forestArea('22000', '2020'),
      datum('total_land_area_affected_by_fire', '30000', fallbackColName),
      datum(variableName, '22409', fallbackColName),
    ],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanForestOrMaxForest}: forest fire within the maximum forest area is valid`,
  },
  {
    cell: fallbackCell,
    data: [
      forestArea('22409'),
      forestArea('22000', '2020'),
      datum('total_land_area_affected_by_fire', '30000', fallbackColName),
      datum(variableName, '22411', fallbackColName),
    ],
    expected: exceedsMaxForest,
    name: `${ValidatorName.notGreaterThanForestOrMaxForest}: forest fire over the maximum forest area is invalid`,
  },
  // Empty total area affected by fire skips the sub category validation
  {
    cell,
    data: [forestArea('22409'), datum(variableName, '300')],
    expected: undefined,
    name: `${ValidatorName.subCategory}: empty total area affected by fire is valid`,
  },
  // Equal to the total is valid
  {
    cell,
    data: [forestArea('22409'), datum('total_land_area_affected_by_fire', '300'), datum(variableName, '300')],
    expected: undefined,
    name: `${ValidatorName.subCategory}: forest fire equal to the total area affected by fire is valid`,
  },
  // The metadata sets the tolerance to 0, so even 0.1 over the total is invalid instead of the default one unit
  {
    cell,
    data: [forestArea('22409'), datum('total_land_area_affected_by_fire', '300'), datum(variableName, '300.1')],
    expected: exceedsTotal,
    name: `${ValidatorName.subCategory}: forest fire a fraction over the total area affected by fire is invalid`,
  },
]
