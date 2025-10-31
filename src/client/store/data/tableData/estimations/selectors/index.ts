import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.data.tableData.estimations

const getEstimations = createSelector(
  [
    getState,
    (_state, assessmentName: AssessmentName) => assessmentName,
    (_state, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
  ],
  (estimations, assessmentName, cycleName, countryIso) => estimations?.[assessmentName]?.[cycleName]?.[countryIso] ?? {}
)

export const EstimationsSelectors = {
  getEstimations,
}
