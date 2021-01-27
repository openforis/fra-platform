// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

const section = FRA.sections['4'].children.a

export const years = FRA.years.slice(0, FRA.yearsTable.length - 1)

const _getTableDataCell = (colIdx: any, rowIdx: any) =>
  AssessmentState.getTableDataCell({
    assessmentType: FRA.type,
    sectionName: section.name,
    tableName: section.tables.forestOwnership,
    colIdx,
    rowIdx,
  })

export const getPublicOwnership = (colIdx: any) => _getTableDataCell(colIdx, 4)

export const getOtherOrUnknown = (colIdx: any) => (state: any) => {
  const forestArea = ExtentOfForestState.getForestByYearFraIdx(colIdx)(state)
  return [0, 4].reduce((value, rowIdx) => {
    return NumberUtils.sub(value, _getTableDataCell(colIdx, rowIdx)(state))
  }, forestArea)
}
