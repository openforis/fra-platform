import { AreaCode } from 'meta/area/areaCode'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'

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

export type CountryUserRouteParams<T = AreaCode> = CountryRouteParams<T> & {
  id: string
}

export type SectionRouteParams<T = AreaCode> = CountryRouteParams<T> & {
  sectionName: SectionName
}

export type OriginalDataPointRouteParams = SectionRouteParams<CountryIso> & {
  year: string
}
