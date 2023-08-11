import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName, SectionName } from 'meta/assessment'

export type AssessmentRouteParams = {
  assessmentName: AssessmentName
}

export type CycleRouteParams = AssessmentRouteParams & {
  cycleName: CycleName
}

export type CountryRouteParams = CycleRouteParams & {
  countryIso: CountryIso
}

export type SectionRouteParams = CountryRouteParams & {
  sectionName: SectionName
}
