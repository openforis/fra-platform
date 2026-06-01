import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { UUID } from 'meta/uuid/uuid'

import { RootState } from 'client/store/types'

import { getCountryValidations } from './base'

export const getSummary = createSelector([getCountryValidations], (countryValidations) => countryValidations.summary)

export const getSummaryHasErrors = createSelector([getSummary], (summary) =>
  Object.values(summary.sections).some((section) => !section.valid)
)

export const getSummarySubSectionHasErrors = createSelector(
  [
    (
      _state: RootState,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      subSectionUuid?: UUID
    ) => subSectionUuid,
    getSummary,
  ],
  (subSectionUuid, summary) => !(summary.subsections?.[subSectionUuid]?.valid ?? true)
)

export const getSummarySectionHasErrors = createSelector(
  [
    (
      _state: RootState,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      sectionUuid?: UUID
    ) => sectionUuid,
    getSummary,
  ],
  (sectionUuid, summary) => !(summary.sections?.[sectionUuid]?.valid ?? true)
)
