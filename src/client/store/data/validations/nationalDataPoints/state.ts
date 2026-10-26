import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'

export type NationalDataPointValidationState = Record<
  AssessmentName,
  Record<CycleName, Record<CountryIso, RecordNDPValidations>>
>

export const initialState: NationalDataPointValidationState = {}
