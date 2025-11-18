import { AreaCode } from 'meta/area/areaCode'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'

export const getRequestReviewSummaryEvent = (props: {
  countryIso: AreaCode
  assessmentName: AssessmentName
  cycleName: string
}): string => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-request-review-summary`
}

export const getRequestReviewStatusEvent = (props: {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
  sectionName: string
}): string => {
  const { assessmentName, countryIso, cycleName, sectionName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-${sectionName}-request-review-status`
}
