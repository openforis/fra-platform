import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import type { DataSourceValidation } from 'meta/assessment/validation/description'
import { UUID } from 'meta/uuid/uuid'

import { RootState } from 'client/store/types'

import { getCountryValidations } from './base'

export const getDescriptionValidation = createSelector(
  [
    getCountryValidations,
    (
      _state: RootState,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      sectionName: SectionName
    ) => sectionName,
    (
      _state: RootState,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      _sectionName: SectionName,
      descriptionName: CommentableDescriptionName
    ) => descriptionName,
  ],
  (countryValidations, sectionName, descriptionName) =>
    countryValidations.descriptions?.[sectionName]?.descriptions?.[descriptionName] ?? { valid: true }
)

export const getDataSourceValidation = createSelector(
  [
    getCountryValidations,
    (
      _state: RootState,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      sectionName: SectionName
    ) => sectionName,
    (
      _state: RootState,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      _sectionName: SectionName,
      uuid: UUID
    ) => uuid,
  ],
  (countryValidations, sectionName, uuid): DataSourceValidation =>
    countryValidations.descriptions?.[sectionName]?.dataSources?.[uuid] ?? {}
)
