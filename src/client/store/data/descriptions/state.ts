import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { DescriptionCountryValues } from 'meta/assessment/descriptionValue'

export type DescriptionsState = Record<AssessmentName, Record<CycleName, DescriptionCountryValues>>

export const initialState: DescriptionsState = {}
