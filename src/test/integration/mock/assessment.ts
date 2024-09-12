import { OriginalDataPoint } from 'meta/assessment'
import { AssessmentNames } from 'meta/assessment/assessmentName'

export const assessmentParams = {
  props: {
    name: AssessmentNames.fraTest,
  },
}

export const assessmentCycleName = '2020'

export const originalDataPoint = {
  countryIso: 'X02',
  year: 2019,
} as OriginalDataPoint
