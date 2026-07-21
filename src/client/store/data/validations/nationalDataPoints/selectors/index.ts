import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { NDPNationalClassValidation, NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { UUID } from 'meta/uuid/uuid'
import { Objects } from 'utils/objects'

import { NationalDataPointValidationState } from 'client/store/data/validations/nationalDataPoints/state'
import { RootState } from 'client/store/types'

const _getState = (state: RootState): NationalDataPointValidationState | undefined =>
  state.data.validations.nationalDataPoints

const _getCountryValidations = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
  ],
  (state, assessmentName, cycleName, countryIso) => state?.[assessmentName]?.[cycleName]?.[countryIso]
)

const getValidations = createSelector([_getCountryValidations], (validations) => validations ?? {})

const getValidation = createSelector(
  [
    getValidations,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, _countryIso: CountryIso, uuid: UUID) =>
      uuid,
  ],
  (validations, uuid): NDPValidation => validations?.[uuid] ?? {}
)

const getValidationByOdpId = createSelector(
  [
    getValidations,
    (
      _state: RootState,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      odpId?: number
    ) => odpId,
  ],
  (validations, odpId): NDPValidation => {
    if (Objects.isNil(odpId)) return {}

    return Object.values(validations ?? {}).find((validation) => validation.odpId === odpId) ?? {}
  }
)

const validationsFetched = createSelector(
  [_getCountryValidations],
  (validations): boolean => !Objects.isNil(validations)
)

const getNationalClassValidation = createSelector(
  [
    getValidation,
    (
      _state: RootState,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      _nationalDataPointUuid: UUID,
      nationalClassUuid: UUID
    ) => nationalClassUuid,
  ],
  (nationalDataPointValidation, nationalClassUuid): NDPNationalClassValidation =>
    nationalDataPointValidation.nationalClasses?.[nationalClassUuid] ?? {}
)

export const NationalDataPointValidationSelectors = {
  getNationalClassValidation,
  getValidation,
  getValidationByOdpId,
  getValidations,
  validationsFetched,
}
