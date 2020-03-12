import * as R from 'ramda'
import * as FRA from '@common/assessment/fra'

import { sub } from '@common/bignumberUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestStateOLD'

const section = FRA.sections['3'].children.a

const getPrimaryDesignatedManagementObjectiveData = AssessmentState.getSectionData(
  FRA.type,
  section.name,
  section.tables.primaryDesignatedManagementObjective
)

export const getUnknown = colIdx => state => {
  const year = FRA.years[colIdx]
  const forestArea = ExtentOfForestState.getForestByYear(year)(state)
  const primaryDesignatedManagementObjective = getPrimaryDesignatedManagementObjectiveData(state)

  return R.range(0, 6).reduce(
    (valueCurrent, row) => sub(valueCurrent, R.pathOr(0, [row, colIdx], primaryDesignatedManagementObjective)),
    forestArea
  )
}
