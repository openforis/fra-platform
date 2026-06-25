import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { UUID } from 'meta/uuid/uuid'

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
