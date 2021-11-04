import * as R from 'ramda'
import { FRA } from '@core/assessment'

import { sub } from '@core/utils/numbers'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ExtentOfForestState from '@webapp/sectionSpec/fra/extentOfForest/extentOfForestState'

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
