import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { UUID } from 'meta/uuid/uuid'
import { Objects } from 'utils/objects'

import { RootState } from 'client/store/types'

import { getCountryValidations } from './base'

export const getNationalDataPointValidations = createSelector(
  [getCountryValidations],
  (countryValidations) => countryValidations.nationalDataPoints
)

export const getNationalDataPointValidation = createSelector(
  [
    getNationalDataPointValidations,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, _countryIso: CountryIso, uuid: UUID) =>
      uuid,
  ],
  (validations, uuid): NDPValidation => validations?.[uuid] ?? {}
)

export const nationalDataPointValidationsFetched = createSelector(
  [
    (state: RootState) => state.data.tableData.validations,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
  ],
  (state, assessmentName, cycleName, countryIso): boolean => {
    const validations = state.nationalDataPoints?.[assessmentName]?.[cycleName]?.[countryIso]
    return !Objects.isNil(validations)
  }
)
