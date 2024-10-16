import { Areas } from 'meta/area'
import { DashboardItem } from 'meta/dashboard'

import { MetadataSelectors } from 'client/store/metadata/selectors'
import { useAppSelector } from 'client/store/store'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { DashboardAreaType } from '../state'

export const useDashboardItems = (): Array<DashboardItem> => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const key = Areas.isISOCountry(countryIso) ? DashboardAreaType.Country : DashboardAreaType.Region
  return useAppSelector((state) => MetadataSelectors.getDashboard(state, assessmentName, cycleName, key))
}
