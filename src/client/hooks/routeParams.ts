import { useParams } from 'react-router'

import { AreaCode } from 'meta/area/areaCode'
import { CountryIso } from 'meta/area/countryIso'
import { Global } from 'meta/area/global'
import { RegionCode } from 'meta/area/regionCode'
import { AssessmentRouteParams } from 'meta/routes/routeParams/assessment'
import { CountryRouteParams, CountryUserRouteParams } from 'meta/routes/routeParams/country'
import { CycleRouteParams } from 'meta/routes/routeParams/cycle'
import { OriginalDataPointRouteParams } from 'meta/routes/routeParams/originalDataPoint'
import { SectionRouteParams } from 'meta/routes/routeParams/section'

export const useAssessmentRouteParams = (): Readonly<Partial<AssessmentRouteParams>> =>
  useParams<AssessmentRouteParams>()

export const useCycleRouteParams = (): Readonly<Partial<CycleRouteParams>> => useParams<CycleRouteParams>()

export const useCountryRouteParams = <T extends CountryIso | RegionCode | Global.WO = AreaCode>(): Readonly<
  Partial<CountryRouteParams<T>>
> => useParams<CountryRouteParams<T>>()

export const useCountryUserRouteParams = <T extends CountryIso | RegionCode | Global.WO = AreaCode>(): Readonly<
  Partial<CountryUserRouteParams<T>>
> => useParams<CountryUserRouteParams<T>>()

export const useSectionRouteParams = <T extends CountryIso | RegionCode | Global.WO = AreaCode>(): Readonly<
  Partial<SectionRouteParams<T>>
> => useParams<SectionRouteParams<T>>()

export const useOriginalDataPointRouteParams = (): Readonly<Partial<OriginalDataPointRouteParams>> =>
  useParams<OriginalDataPointRouteParams>()
