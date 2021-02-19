import * as R from 'ramda'

import FRAUtils from '@common/fraUtils'
import FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const section = FRA.sections['7'].children.c

export const getNonWoodForestProductsTotal = () =>
  R.pipe(
    AssessmentState.getSectionData(FRA.type, section.name, section.tables.nonWoodForestProductsRemovals),
    FRAUtils.sumTableColumn(4, R.range(0, 13))
  )
