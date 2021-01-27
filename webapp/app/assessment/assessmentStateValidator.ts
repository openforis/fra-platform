// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRAUtils from '@common/fraUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

export const subCategoryValidator = (
  assessmentType: any,
  sectionName: any,
  tableName: any,
  rowTotalIdx: any,
  rowIdxs: any
) => (colIdx: any, rowIdx: any) => (state: any) => {
  const data = AssessmentState.getSectionData(assessmentType, sectionName, tableName)(state)
  const valueCell = R.pathOr(0, [rowIdx, colIdx])(data)

  if (!valueCell) {
    return true
  }

  const valueCellTotal = R.pathOr(0, [rowTotalIdx, colIdx])(data)
  const valueRowsSum = FRAUtils.sumTableColumn(colIdx, rowIdxs)(data)

  return NumberUtils.greaterThanWithTolerance(valueCellTotal, valueRowsSum)
}

export const positiveOrZeroValidator = (assessmentType: any, sectionName: any, tableName: any) => (
  colIdx: any,
  rowIdx: any
) => (state: any) => {
  const value = R.pipe(
    AssessmentState.getSectionData(assessmentType, sectionName, tableName),
    R.pathOr(null, [rowIdx, colIdx])
  )(state)

  return R.isNil(value) || NumberUtils.greaterThanOrEqualTo(value, 0)
}
