import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.data.contacts

const getContacts = createSelector(
  [
    getState,
    (_state, assessmentName: AssessmentName) => assessmentName,
    (_state, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
  ],
  (contacts, assessmentName, cycleName, countryIso) => contacts?.[assessmentName]?.[cycleName]?.[countryIso] ?? []
)

export const ContactsSelectors = {
  getContacts,
}
