import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'

export type DescriptionValidationState = Record<
  AssessmentName,
  Record<CycleName, Record<CountryIso, RecordDescriptionValidations>>
>

export const initialState: DescriptionValidationState = {}
