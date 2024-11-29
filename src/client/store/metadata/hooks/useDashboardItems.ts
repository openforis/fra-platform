import { DashboardItem, Dashboards } from 'meta/dashboard'

import { MetadataSelectors } from 'client/store/metadata/selectors'
import { useAppSelector } from 'client/store/store'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useDashboardItems = (): Array<DashboardItem> => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const key = Dashboards.getAreaType(countryIso)
  return useAppSelector((state) => MetadataSelectors.getDashboardItems(state, assessmentName, cycleName, key))
}
