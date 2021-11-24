import * as R from 'ramda'
import { Numbers } from '@core/utils/numbers'
import FRAUtils from '@common/fraUtils'

import * as AssessmentState from '../../app/assessment/assessmentState'

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

    return Numbers.greaterThanWithTolerance(valueCellTotal, valueRowsSum)
  }

export const positiveOrZeroValidator =
  (assessmentType: any, sectionName: any, tableName: any) => (colIdx: any, rowIdx: any) => (state: any) => {
    const value = R.pipe(
      AssessmentState.getSectionData(assessmentType, sectionName, tableName),
      R.pathOr(null, [rowIdx, colIdx])
    )(state)

    return R.isNil(value) || Numbers.greaterThanOrEqualTo(value, 0)
  }
