import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'

import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.data.linkedDataSources

const getLinkedDataSources = createSelector(
  [
    getState,
    (_state, assessmentName: AssessmentName) => assessmentName,
    (_state, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
    (
      _state,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      sectionName: SectionName
    ) => sectionName,
  ],
  (state, assessmentName, cycleName, countryIso, sectionName) =>
    state?.[assessmentName]?.[cycleName]?.[countryIso]?.[sectionName]
)

export const LinkedDataSourcesSelectors = {
  getLinkedDataSources,
}
