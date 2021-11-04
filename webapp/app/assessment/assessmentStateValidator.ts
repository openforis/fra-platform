import * as R from 'ramda'
import * as NumberUtils from '@core/utils/numbers'
import FRAUtils from '@common/fraUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

export const subCategoryValidator =
  (assessmentType: any, sectionName: any, tableName: any, rowTotalIdx: any, rowIdxs: any) =>
  (colIdx: any, rowIdx: any) =>
  (state: any) => {
    const data = AssessmentState.getSectionData(assessmentType, sectionName, tableName)(state)
    const valueCell = R.pathOr(0, [rowIdx, colIdx])(data)

    if (!valueCell) {
      return true
    }

    const valueCellTotal = R.pathOr(0, [rowTotalIdx, colIdx])(data)
    const valueRowsSum = FRAUtils.sumTableColumn(colIdx, rowIdxs)(data)

    return NumberUtils.greaterThanWithTolerance(valueCellTotal, valueRowsSum)
  }

export const positiveOrZeroValidator =
  (assessmentType: any, sectionName: any, tableName: any) => (colIdx: any, rowIdx: any) => (state: any) => {
    const value = R.pipe(
      AssessmentState.getSectionData(assessmentType, sectionName, tableName),
      R.pathOr(null, [rowIdx, colIdx])
    )(state)

    return R.isNil(value) || NumberUtils.greaterThanOrEqualTo(value, 0)
  }
