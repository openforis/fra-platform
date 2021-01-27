// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRAUtils from '@common/fraUtils'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

const section = FRA.sections['1'].children.f
const rowsIdxOtherLand = R.range(0, 5)

export const getOtherLandWithTreeCoverTotal = (colIdx: any) =>
  R.pipe(
    AssessmentState.getSectionData(FRA.type, section.name, section.tables.otherLandWithTreeCover),
    FRAUtils.sumTableColumn(colIdx, rowsIdxOtherLand)
  )

export const getOtherLand = (colIdx: any) => ExtentOfForestState.getOtherLandByYear(FRA.yearsTable[colIdx])
