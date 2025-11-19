import { AreaCode } from 'meta/area/areaCode'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

type Props = {
  countryIso: AreaCode
  assessmentName: AssessmentName
  cycleName: CycleName
}

export const getNodeValidationsUpdateEvent = (props: Props): string => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-validationsUpdate`
}

export const getNodeValuesUpdateEvent = (props: Props): string => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-nodeUpdates`
}
