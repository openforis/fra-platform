import { AreaCode } from 'meta/area/areaCode'
import { CycleRouteParams } from 'meta/routes/routeParams/cycle'

export type CountryRouteParams<AREA_CODE = AreaCode> = CycleRouteParams & {
  countryIso: AREA_CODE
}

export type CountryHomeRouteParams = CountryRouteParams & {
  sectionName?: string
}

export type CountryUserRouteParams<AREA_CODE = AreaCode> = CountryRouteParams<AREA_CODE> & {
  id: string
}
