import * as R from 'ramda'

import FRAUtils from '@common/fraUtils'
import { FRA } from '@core/assessment'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const section = FRA.sections['5'].children.a

export const getDisturbancesTotal = (colIdx: any) =>
  R.pipe(
    AssessmentState.getSectionData(FRA.type, section.name, section.tables.disturbances),
    FRAUtils.sumTableColumn(colIdx, R.range(0, 4))
  )
