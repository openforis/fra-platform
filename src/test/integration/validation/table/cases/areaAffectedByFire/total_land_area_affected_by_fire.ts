import { TableNames } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.areaAffectedByFire
const colName = '2000'
// Extent of forest has no annual columns, so a fire year without a land area falls back to maxLandArea()
const fallbackColName = '2001'
const variableName = 'total_land_area_affected_by_fire'
const cell = { colName, tableName, variableName }
const fallbackCell = { ...cell, colName: fallbackColName }

const datum = (raw: string, col = colName): NodeUpdate => ({ colName: col, tableName, value: { raw }, variableName })
const totalLandArea = (raw: string, col = colName): NodeUpdate => ({
  colName: col,
  tableName: TableNames.extentOfForest,
  value: { raw },
  variableName: 'totalLandArea',
})

const exceedsLandArea = {
  messages: [
    {
      key: 'generalValidation.landAreaExceedsTotalLandArea',
      name: ValidatorName.notGreaterThanLandArea,
      params: { value: '30000.00' },
    },
  ],
  valid: false,
}
const exceedsMaxLandArea = {
  messages: [
    {
      key: 'generalValidation.valueCannotExceedMaximumValueReportedForLandArea',
      name: ValidatorName.notGreaterThanLandAreaOrMaxLandArea,
      params: { maxLandArea: '30000.00' },
    },
  ],
  valid: false,
}

export const totalLandAreaAffectedByFire: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanLandAreaOrMaxLandArea}: empty data is valid`,
  },
  // Without any land area, the year and the maximum can't be checked
  {
    cell,
    data: [datum('500')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanLandAreaOrMaxLandArea}: empty extent of forest is valid`,
  },
  {
    cell,
    data: [totalLandArea('30000')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanLandAreaOrMaxLandArea}: empty area affected by fire is valid`,
  },
  {
    cell,
    data: [totalLandArea('30000'), datum('500')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanLandAreaOrMaxLandArea}: fire within the land area is valid`,
  },
  // The land area check allows one unit of tolerance
  {
    cell,
    data: [totalLandArea('30000'), datum('30001')],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanLandAreaOrMaxLandArea}: fire one unit over the land area is valid`,
  },
  {
    cell,
    data: [totalLandArea('30000'), datum('30002')],
    expected: exceedsLandArea,
    name: `${ValidatorName.notGreaterThanLandAreaOrMaxLandArea}: fire over the land area is invalid`,
  },
  // A year without a land area is checked against the maximum land area of the other years
  {
    cell: fallbackCell,
    data: [totalLandArea('30000'), totalLandArea('29000', '2020'), datum('30000', fallbackColName)],
    expected: undefined,
    name: `${ValidatorName.notGreaterThanLandAreaOrMaxLandArea}: fire within the maximum land area is valid`,
  },
  {
    cell: fallbackCell,
    data: [totalLandArea('30000'), totalLandArea('29000', '2020'), datum('30002', fallbackColName)],
    expected: exceedsMaxLandArea,
    name: `${ValidatorName.notGreaterThanLandAreaOrMaxLandArea}: fire over the maximum land area is invalid`,
  },
]
