import * as R from 'ramda'
import { add, greaterThan, sub } from '@common/bignumberUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

export const subCategoryValidator = (
  assessmentType,
  sectionName,
  tableName,
  rowTotalIdx,
  rowIdxs
) => colIdx => state => {
  const data = AssessmentState.getSectionData(assessmentType, sectionName, tableName)(state)

  const totalValue = R.pathOr(0, [rowTotalIdx, colIdx])(data)
  const values = rowIdxs.reduce((total, idx) => {
    const value = R.pathOr(0, [idx, colIdx])(data)
    return add(total, value)
  }, 0)

  const tolerance = -1
  const difference = sub(totalValue, values)
  return greaterThan(difference, tolerance)
}
