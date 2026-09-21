import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { ValidationSummary } from 'meta/assessment/validation/summary'

export type SummaryValidationState = Record<AssessmentName, Record<CycleName, Record<CountryIso, ValidationSummary>>>

export const initialState: SummaryValidationState = {}
