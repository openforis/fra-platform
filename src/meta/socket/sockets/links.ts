import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export const getLinksVerificationEvent = (props: { assessmentName: AssessmentName; cycleName: CycleName }): string => {
  const { assessmentName, cycleName } = props
  return `${assessmentName}-${cycleName}-linksVerification`
}
