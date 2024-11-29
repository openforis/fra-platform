import { Areas } from 'meta/area'

import { DashboardAreaType } from 'client/store/metadata/state'

const getAreaType = (countryIso: string): DashboardAreaType =>
  Areas.isISOCountry(countryIso) ? DashboardAreaType.Country : DashboardAreaType.Region

export const Dashboards = {
  getAreaType,
}
