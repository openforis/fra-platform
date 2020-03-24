import * as NumberUtils from '@common/bignumberUtils'
import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

const section = FRA.sections['4'].children.a

export const years = FRA.years.slice(0, FRA.yearsTable.length - 1)

const _getTableDataCell = (colIdx, rowIdx) =>
  AssessmentState.getTableDataCell({
    assessmentType: FRA.type,
    sectionName: section.name,
    tableName: section.tables.forestOwnership,
    colIdx,
    rowIdx,
  })

export const getPublicOwnership = colIdx => _getTableDataCell(colIdx, 4)

export const getOtherOrUnknown = colIdx => state => {
  const forestArea = ExtentOfForestState.getForestByYearFraIdx(colIdx)(state)
  return [0, 4].reduce((value, rowIdx) => {
    return NumberUtils.sub(value, _getTableDataCell(colIdx, rowIdx)(state))
  }, forestArea)
}
