import { useSelector } from 'react-redux'

import { Dashboards } from 'meta/dashboard'

import { RootState } from 'client/store/RootState'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { MetadataSelectors } from '../selectors'

export const useDashboardLoaded = (): boolean => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const key = Dashboards.getAreaType(countryIso)
  return useSelector((state: RootState) => MetadataSelectors.getDashboardLoaded(state, assessmentName, cycleName, key))
}
