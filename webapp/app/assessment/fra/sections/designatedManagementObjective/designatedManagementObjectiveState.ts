// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { sub } from '@common/bignumberUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

const section = FRA.sections['3'].children.a

const getPrimaryDesignatedManagementObjectiveData = AssessmentState.getSectionData(
  FRA.type,
  section.name,
  section.tables.primaryDesignatedManagementObjective
)

export const getUnknown = (colIdx: any) => (state: any) => {
  const year = FRA.yearsTable[colIdx]
  const forestArea = ExtentOfForestState.getForestByYear(year)(state)
  const primaryDesignatedManagementObjective = getPrimaryDesignatedManagementObjectiveData(state)

  return R.range(0, 6).reduce(
    (valueCurrent: any, row: any) =>
      sub(valueCurrent, R.pathOr(0, [row, colIdx], primaryDesignatedManagementObjective)),
    forestArea
  )
}
