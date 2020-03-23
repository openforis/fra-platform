import * as R from 'ramda'
import * as NumberUtils from '@common/bignumberUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

export const subCategoryValidator = (assessmentType, sectionName, tableName, rowTotalIdx, rowIdxs) => (
  colIdx,
  rowIdx
) => state => {
  const data = AssessmentState.getSectionData(assessmentType, sectionName, tableName)(state)
  const cellValue = R.pathOr(0, [rowIdx, colIdx])(data)

  if (!cellValue) {
    return true
  }

  const totalValue = R.pathOr(0, [rowTotalIdx, colIdx])(data)
  const values = rowIdxs.reduce((total, idx) => {
    const value = R.pathOr(0, [idx, colIdx])(data)
    return NumberUtils.add(total, value)
  }, 0)

  const tolerance = -1
  const difference = NumberUtils.sub(totalValue, values)
  return NumberUtils.greaterThan(difference, tolerance)
}

export const positiveOrZeroValidator = (assessmentType, sectionName, tableName) => (colIdx, rowIdx) => state => {
  const value = R.pipe(
    AssessmentState.getSectionData(assessmentType, sectionName, tableName),
    R.pathOr(null, [rowIdx, colIdx])
  )(state)

  return R.isNil(value) || NumberUtils.greaterThanOrEqualTo(value, 0)
}
