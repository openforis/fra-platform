import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export enum LinksVerificationEvent {
  queued = 'queued',
  active = 'active',
  completed = 'completed',
  failed = 'failed',
}

type Props = {
  assessmentName: AssessmentName
  countryIso?: CountryIso
  cycleName: CycleName
}

export const getLinksVerificationEvent = (props: Props): string => {
  const { assessmentName, countryIso, cycleName } = props

  return countryIso
    ? `${assessmentName}-${cycleName}-${countryIso}-linksVerification`
    : `${assessmentName}-${cycleName}-linksVerification`
}
