import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export const getCountryUpdateEvent = (props: {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
}): string => {
  const { assessmentName, countryIso, cycleName } = props

  return `${assessmentName}-${cycleName}-${countryIso}-countryUpdate`
}
