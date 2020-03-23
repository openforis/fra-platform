import * as R from 'ramda'

import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const section = FRA.sections['2'].children.c

const getSectionData = AssessmentState.getSectionData(FRA.type, section.name, section.tables.biomassStock)

// ==== By Year getters

export const getAboveGroundBiomassByYear = year => state => {
  const colIdx = FRA.years.indexOf(year)
  return R.pipe(getSectionData, R.pathOr(null, [0, colIdx]))(state)
}
