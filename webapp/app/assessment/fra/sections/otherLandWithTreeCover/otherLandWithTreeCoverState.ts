import * as R from 'ramda'

import FRAUtils from '@common/fraUtils'
import { FRA } from '@core/assessment'

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
