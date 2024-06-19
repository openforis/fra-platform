import { useMemo } from 'react'

import { Areas } from 'meta/area'
import { AssessmentName, AssessmentNames, Cycle, CycleName } from 'meta/assessment'
import { DashboardItem } from 'meta/dashboard'

import { useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import { forestArea } from 'client/pages/CountryHome/Overview/meta/forestArea'
import { forestAreaPercentOfLandArea } from 'client/pages/CountryHome/Overview/meta/forestAreaPercentOfLandArea'
import { forestAreaWithinProtectedAreas } from 'client/pages/CountryHome/Overview/meta/forestAreaWithinProtectedAreas'
import { forestGrowingStockAndCarbonDashboard } from 'client/pages/CountryHome/Overview/meta/forestGrowingStockAndCarbon'
import { forestOwnership } from 'client/pages/CountryHome/Overview/meta/forestOwnership'
import { naturallyRegeneratingForestArea } from 'client/pages/CountryHome/Overview/meta/naturallyRegeneratingForestArea'
import { primaryDesignatedManagementObjectiveDashboard } from 'client/pages/CountryHome/Overview/meta/primaryDesignatedManagementObjective'
import { primaryForestPercentOfForestArea } from 'client/pages/CountryHome/Overview/meta/primaryForestPercentOfForestArea'

const fra2020Dashboard = (cycle: Cycle, region: boolean): Array<DashboardItem> => [
  forestArea(cycle),
  forestGrowingStockAndCarbonDashboard(cycle, region),
  forestAreaPercentOfLandArea(cycle),
  primaryForestPercentOfForestArea(cycle),
  forestAreaWithinProtectedAreas(cycle),
  forestOwnership(cycle),
  primaryDesignatedManagementObjectiveDashboard(cycle, region),
  naturallyRegeneratingForestArea(cycle),
]
const fra2025Dashboard = (cycle: Cycle, region: boolean): Array<DashboardItem> => [
  forestArea(cycle),
  forestGrowingStockAndCarbonDashboard(cycle, region),
  forestAreaPercentOfLandArea(cycle),
  primaryForestPercentOfForestArea(cycle),
  forestAreaWithinProtectedAreas(cycle),
  forestOwnership(cycle),
  primaryDesignatedManagementObjectiveDashboard(cycle, region),
  naturallyRegeneratingForestArea(cycle),
]

export type Dashboard = Record<AssessmentName, Record<CycleName, Array<DashboardItem>>>

export const useDashboardMeta = (): Dashboard => {
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const region = !Areas.isISOCountry(countryIso)

  return useMemo<Dashboard>(() => {
    return {
      [AssessmentNames.fra]: {
        '2020': fra2020Dashboard(cycle, region),
        '2025': fra2025Dashboard(cycle, region),
      },
    }
  }, [cycle, region])
}
