import { AreaCode, CountryIso } from 'meta/area'
import { AssessmentName, CycleName, SectionName } from 'meta/assessment'

export type AssessmentRouteParams = {
  assessmentName: AssessmentName
}

export type CycleRouteParams = AssessmentRouteParams & {
  cycleName: CycleName
}

export type CountryRouteParams<T = AreaCode> = CycleRouteParams & {
  countryIso: T
}

export type CountryHomeRouteParams = CountryRouteParams & {
  sectionName?: string
}

export type CountryUserRouteParams = CountryRouteParams & {
  id: number
}

export type SectionRouteParams<T = AreaCode> = CountryRouteParams<T> & {
  sectionName: SectionName
}

export type OriginalDataPointRouteParams = SectionRouteParams<CountryIso> & {
  year: string
}
