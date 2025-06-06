import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.data.descriptions

const getDescriptions = createSelector(
  [
    getState,
    (_state, assessmentName: AssessmentName) => assessmentName,
    (_state, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
    (_state, _assessmentName: AssessmentName, _cycleName: CycleName, _countryIso: CountryIso, sectionName: string) =>
      sectionName,
    (
      _state,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      _sectionName: string,
      name: CommentableDescriptionName
    ) => name,
  ],
  (descriptions, assessmentName, cycleName, countryIso, sectionName, name) =>
    descriptions?.[assessmentName]?.[cycleName]?.[countryIso]?.[sectionName]?.[name] ?? []
)

export const DescriptionsSelectors = {
  getDescriptions,
}
