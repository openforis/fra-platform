import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'

export type TableValidationState = Record<
  AssessmentName,
  Record<CycleName, Record<CountryIso, RecordTableValidationsState>>
>

export const initialState: TableValidationState = {}
