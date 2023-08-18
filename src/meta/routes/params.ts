import { AreaCode } from 'meta/area'
import { AssessmentName, CycleName, SectionName } from 'meta/assessment'

export type AssessmentRouteParams = {
  assessmentName: AssessmentName
}

export type CycleRouteParams = AssessmentRouteParams & {
  cycleName: CycleName
}

export type CountryRouteParams = CycleRouteParams & {
  countryIso: AreaCode
}

export type CountryHomeRouteParams = CountryRouteParams & {
  sectionName?: string
}

export type CountryUserRouteParams = CountryRouteParams & {
  id: number
}

export type SectionRouteParams = CountryRouteParams & {
  sectionName: SectionName
}
