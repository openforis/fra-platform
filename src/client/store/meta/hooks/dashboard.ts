import { Areas } from 'meta/area'
import { DashboardItem } from 'meta/dashboard'

import { useAppSelector } from 'client/store/hooks'
import { MetadataSelectors } from 'client/store/meta/selectors'
import { DashboardAreaType } from 'client/store/meta/state'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useDashboardItems = (): Array<DashboardItem> => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()

  const key = Areas.isISOCountry(countryIso) ? DashboardAreaType.Country : DashboardAreaType.Region

  return useAppSelector((state) => MetadataSelectors.getDashboard(state, assessmentName, cycleName, key))
}
