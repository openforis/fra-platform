import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import type { DataSourceRowValidations } from 'meta/assessment/validation/description'

import { DescriptionValidationState } from 'client/store/data/validations/descriptions/state'
import { RootState } from 'client/store/types'

const _getState = (state: RootState): DescriptionValidationState | undefined => state.data.validations.descriptions

const _getCountryDescriptionValidations = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
  ],
  (state, assessmentName, cycleName, countryIso) => state?.[assessmentName]?.[cycleName]?.[countryIso] ?? {}
)

const _getSectionName = (
  _state: RootState,
  _assessmentName: AssessmentName,
  _cycleName: CycleName,
  _countryIso: CountryIso,
  sectionName: SectionName
): SectionName => sectionName

const _getSectionValidations = createSelector(
  [_getCountryDescriptionValidations, _getSectionName],
  (countryValidations, sectionName) => countryValidations?.[sectionName]
)

const getDescriptionValidation = createSelector(
  [
    _getSectionValidations,
    (
      _state: RootState,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      _sectionName: SectionName,
      descriptionName: CommentableDescriptionName
    ) => descriptionName,
  ],
  (sectionValidations, descriptionName) => sectionValidations?.descriptions?.[descriptionName] ?? { valid: true }
)

const getDataSourceValidations = createSelector(
  [_getSectionValidations],
  (sectionValidations): DataSourceRowValidations => sectionValidations?.dataSources ?? {}
)

export const DescriptionValidationSelectors = {
  getDataSourceValidations,
  getDescriptionValidation,
}
