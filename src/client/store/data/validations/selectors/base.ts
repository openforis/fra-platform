import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { ValidationSummary } from 'meta/assessment/validation/summary'

import { RecordTableValidationsState } from 'client/store/data/validations/state'
import { RootState } from 'client/store/types'

type CountryValidations = {
  descriptions: RecordDescriptionValidations
  nationalDataPoints: RecordNDPValidations
  summary: ValidationSummary
  tables: RecordTableValidationsState
}

const _getState = (state: RootState) => state.data.validations

const emptySummary: ValidationSummary = {
  descriptions: {},
  nationalDataPoints: {},
  sections: {},
  subsections: {},
  tables: {},
}

export const getCountryValidations = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
  ],
  (state, assessmentName, cycleName, countryIso): CountryValidations => ({
    descriptions: state?.descriptions?.[assessmentName]?.[cycleName]?.[countryIso] ?? {},
    nationalDataPoints: state?.nationalDataPoints?.[assessmentName]?.[cycleName]?.[countryIso] ?? {},
    summary: state?.summary?.[assessmentName]?.[cycleName]?.[countryIso] ?? emptySummary,
    tables: state?.tables?.[assessmentName]?.[cycleName]?.[countryIso] ?? {},
  })
)
