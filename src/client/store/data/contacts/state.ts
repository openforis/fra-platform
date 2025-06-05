import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Contact } from 'meta/cycleData'

export type ContactsState = Record<AssessmentName, Record<CycleName, Record<CountryIso, Array<Contact>>>>

export const initialState: ContactsState = {}
