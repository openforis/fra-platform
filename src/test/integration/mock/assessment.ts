import { OriginalDataPoint } from '@meta/assessment'
import { AssessmentNames } from '@meta/assessment/assessmentName'

export const assessmentParams = {
  metaCache: { calculations: { dependants: {}, dependencies: {} } },
  props: {
    name: AssessmentNames.fraTest,
  },
}

export const assessmentCycleName = '2020'

export const originalDataPoint = {
  countryIso: 'AFG',
  year: 2019,
} as OriginalDataPoint
