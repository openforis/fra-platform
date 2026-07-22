import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { UUID } from 'meta/uuid/uuid'

import { SummaryValidationState } from 'client/store/data/validations/summary/state'
import { RootState } from 'client/store/types'

const _getState = (state: RootState): SummaryValidationState | undefined => state.data.validations.summary

const emptySummary: ValidationSummary = {
  descriptions: {},
  nationalDataPoints: {},
  sections: {},
  subsections: {},
  tables: {},
}

const get = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
  ],
  (state, assessmentName, cycleName, countryIso) => state?.[assessmentName]?.[cycleName]?.[countryIso] ?? emptySummary
)

const hasErrors = createSelector([get], (summary) => Object.values(summary.sections).some((section) => !section.valid))

const _getTargetUuid = (
  _state: RootState,
  _assessmentName: AssessmentName,
  _cycleName: CycleName,
  _countryIso: CountryIso,
  targetUuid?: UUID
): UUID | undefined => targetUuid

const subSectionHasErrors = createSelector(
  [_getTargetUuid, get],
  (subSectionUuid, summary) => !(summary.subsections?.[subSectionUuid]?.valid ?? true)
)

const sectionHasErrors = createSelector(
  [_getTargetUuid, get],
  (sectionUuid, summary) => !(summary.sections?.[sectionUuid]?.valid ?? true)
)

export const SummaryValidationSelectors = {
  get,
  hasErrors,
  sectionHasErrors,
  subSectionHasErrors,
}
