import * as R from 'ramda'

import { Numbers } from '@core/utils/numbers'
import { FRA } from '@core/assessment'

import * as AssessmentState from '../../../app/assessment/assessmentState'

const section = FRA.sections['2'].children.a

export const variables = {
  naturallyRegeneratingForest: 'naturallyRegeneratingForest',
  plantedForest: 'plantedForest',
  plantationForest: 'plantationForest',
  otherPlantedForest: 'otherPlantedForest',
  forest: 'forest',
  otherWoodedLand: 'otherWoodedLand',
}

const baseValueVariablesMapping = {
  [variables.naturallyRegeneratingForest]: 'naturalForestArea',
  [variables.plantedForest]: 'plantedForestArea',
  [variables.plantationForest]: 'plantationForestArea',
  [variables.otherPlantedForest]: 'otherPlantedForestArea',
  [variables.forest]: 'forestArea',
  [variables.otherWoodedLand]: 'otherWoodedLand',
}

const _getTableData = (tableName: any) => () =>
  R.pipe(
    AssessmentState.getSectionData(FRA.type, section.name, section.name),
    R.propOr(null, tableName),
    R.unless(R.isNil, R.values)
  )

export const getTableDataAvg = _getTableData(section.tables.avgTable)

export const getTableDataTotal = _getTableData(section.tables.totalTable)

export const getTableDataBase = _getTableData(section.tables.baseTable)

const _getTableValue = (getTableDataFn: any, year: any, variableName: any) =>
  R.pipe(
    getTableDataFn(),
    R.defaultTo([]),
    R.find((datum: any) => String(datum.year) === String(year)),
    R.prop(variableName)
  )

const _getBaseTableValue = (year: any, variableName: any) =>
  _getTableValue(getTableDataBase, year, baseValueVariablesMapping[variableName])

export const getAvgTableValue = (year: any, variableName: any) => _getTableValue(getTableDataAvg, year, variableName)

export const getTotalTableValue = (year: any, variableName: any) =>
  _getTableValue(getTableDataTotal, year, variableName)

export const calculateTotalValue = (year: any, variableName: any, avgValue: any) => (state: any) => {
  const baseValue: any = _getBaseTableValue(year, variableName)(state)
  return Numbers.toString(Numbers.div(Numbers.mul(avgValue, baseValue), 1000))
}

export const calculateAvgValue = (year: any, variableName: any, totalValue: any) => (state: any) => {
  const baseValue: any = _getBaseTableValue(year, variableName)(state)
  return Numbers.toString(Numbers.div(Numbers.mul(totalValue, 1000), baseValue))
}
