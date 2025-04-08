import { AssessmentNames } from 'meta/assessment/assessment'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

export const assessmentParams = {
  props: {
    name: AssessmentNames.fraTest,
    default: true,
  },
}

export const assessmentCycleName = '2020'

export const originalDataPoint = {
  countryIso: 'X02',
  year: 2019,
} as OriginalDataPoint
