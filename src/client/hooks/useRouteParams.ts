import { useParams } from 'react-router-dom'

import {
  AssessmentRouteParams,
  CountryRouteParams,
  CycleRouteParams,
  OriginalDataPointRouteParams,
  SectionRouteParams,
} from 'meta/routes'

export const useAssessmentRouteParams = () => useParams<AssessmentRouteParams>()

export const useCycleRouteParams = () => useParams<CycleRouteParams>()

export const useCountryRouteParams = () => useParams<CountryRouteParams>()

export const useSectionRouteParams = () => useParams<SectionRouteParams>()

export const useOriginalDataPointRouteParams = () => useParams<OriginalDataPointRouteParams>()
