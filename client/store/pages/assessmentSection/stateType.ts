import { CountryIso } from '@meta/area'
import { NodeValue } from '@meta/assessment'

export type AssessmentSectionState = {
  data?: any
  metaData?: Record<string, Record<CountryIso, Record<string, NodeValue>>>
}
