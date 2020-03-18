import * as R from 'ramda'

import { div, mul, toString } from '@common/bignumberUtils'
import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const section = FRA.sections['2'].children.a

export const variables = {
  naturallyRegeneratingForest: {},
  plantedForest: {},
  plantationForest: { subcategory: true },
  otherPlantedForest: { subcategory: true },
  forest: {},
  otherWoodedLand: {},
}

const baseValueVariablesMapping = {
  naturallyRegeneratingForest: 'naturalForestArea',
  plantedForest: 'plantedForestArea',
  plantationForest: 'plantationForestArea',
  otherPlantedForest: 'otherPlantedForestArea',
  forest: 'forestArea',
  otherWoodedLand: 'otherWoodedLand',
}

const _getTableData = tableName => () =>
  R.pipe(
    AssessmentState.getSectionData(FRA.type, section.name, section.name),
    R.propOr(null, tableName),
    R.unless(R.isNil, R.values)
  )

export const getTableDataAvg = _getTableData(section.tables.avgTable)

export const getTableDataTotal = _getTableData(section.tables.totalTable)

export const getTableDataBase = _getTableData(section.tables.baseTable)

const _getTableValue = (getTableDataFn, year, variableName) =>
  R.pipe(
    getTableDataFn(),
    R.find(datum => String(datum.year) === String(year)),
    R.prop(variableName)
  )

const _getBaseTableValue = (year, variableName) =>
  _getTableValue(getTableDataBase, year, baseValueVariablesMapping[variableName])

export const getAvgTableValue = (year, variableName) => _getTableValue(getTableDataAvg, year, variableName)

export const getTotalTableValue = (year, variableName) => _getTableValue(getTableDataTotal, year, variableName)

export const calculateTotalValue = (year, variableName, avgValue) => state => {
  const baseValue = _getBaseTableValue(year, variableName)(state)
  const value = toString(div(mul(avgValue, baseValue), 1000))
  return value
}

export const calculateAvgValue = (year, variableName, totalValue) => state => {
  const baseValue = _getBaseTableValue(year, variableName)(state)
  const value = toString(div(mul(totalValue, 1000), baseValue))
  return value
}
