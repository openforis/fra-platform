import { Areas } from 'meta/area'
import { DashboardItem } from 'meta/dashboard'

import { MetadataSelectors } from 'client/store/metadata/selectors'
import { useAppSelector } from 'client/store/store'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useDashboardItems = (): Array<DashboardItem> => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const key = Areas.isISOCountry(countryIso) ? 'country' : 'region'
  return useAppSelector((state) => MetadataSelectors.getDashboard(state, assessmentName, cycleName)?.[key])
}
