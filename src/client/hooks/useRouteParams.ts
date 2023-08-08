import { useParams } from 'react-router-dom'

import { AssessmentRouteParams, CountryRouteParams, CycleRouteParams, SectionRouteParams } from 'meta/routes/params'

export const useAssessmentRouteParams = () => useParams<AssessmentRouteParams>()

export const useCycleRouteParams = () => useParams<CycleRouteParams>()

export const useCountryRouteParams = () => useParams<CountryRouteParams>()

export const useSectionRouteParams = () => useParams<SectionRouteParams>()
