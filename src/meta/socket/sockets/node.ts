import { AreaCode } from 'meta/area/areaCode'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

type Props = {
  countryIso: AreaCode
  assessmentName: AssessmentName
  cycleName: CycleName
}

export const getTableValidationsUpdateEvent = (props: Props): string => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-validationsUpdate`
}

export const getDescriptionValidationsUpdateEvent = (props: Props): string => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-descriptionLinksValidationUpdate`
}

export const getNodeValuesUpdateEvent = (props: Props): string => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-nodeUpdates`
}
