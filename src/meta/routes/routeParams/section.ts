import { AreaCode } from 'meta/area/areaCode'
import { SectionName } from 'meta/assessment/section'
import { CountryRouteParams } from 'meta/routes/routeParams/country'

export type SectionRouteParams<AREA_CODE = AreaCode> = CountryRouteParams<AREA_CODE> & {
  sectionName: SectionName
}
