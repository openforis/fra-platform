import * as R from 'ramda'

import * as FRAUtils from '@common/fraUtils'
import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const section = FRA.sections['5'].children.a

export const getDisturbancesTotal = colIdx =>
  R.pipe(
    AssessmentState.getSectionData(FRA.type, section.name, section.tables.disturbances),
    FRAUtils.sumTableColumn(colIdx, R.range(0, 4))
  )
