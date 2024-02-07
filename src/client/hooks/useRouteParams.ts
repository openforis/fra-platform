import { useParams } from 'react-router-dom'

import { AreaCode, CountryIso, Global, RegionCode } from 'meta/area'
import {
  AssessmentRouteParams,
  CountryRouteParams,
  CycleRouteParams,
  OriginalDataPointRouteParams,
  SectionRouteParams,
} from 'meta/routes'

export const useAssessmentRouteParams = () => useParams<AssessmentRouteParams>()

export const useCycleRouteParams = () => useParams<CycleRouteParams>()

export const useCountryRouteParams = <T extends CountryIso | RegionCode | Global.WO = AreaCode>() =>
  useParams<CountryRouteParams<T>>()

export const useSectionRouteParams = <T extends CountryIso | RegionCode | Global.WO = AreaCode>() =>
  useParams<SectionRouteParams<T>>()

export const useOriginalDataPointRouteParams = () => useParams<OriginalDataPointRouteParams>()
