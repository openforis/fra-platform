import { useMemo } from 'react'

import { Areas } from 'meta/area'
import { AssessmentName, AssessmentNames, Cycle, CycleName } from 'meta/assessment'
import { DashboardItem } from 'meta/dashboard'

import { useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import { useAssessmentRouteParams } from 'client/hooks/useRouteParams'

import { forestArea } from '../meta/forestArea'
import { forestAreaPercentOfLandArea } from '../meta/forestAreaPercentOfLandArea'
import { forestAreaWithinProtectedAreas } from '../meta/forestAreaWithinProtectedAreas'
import { forestGrowingStockAndCarbonDashboard } from '../meta/forestGrowingStockAndCarbon'
import { forestOwnership } from '../meta/forestOwnership'
import { naturallyRegeneratingForestArea } from '../meta/naturallyRegeneratingForestArea'
import { primaryDesignatedManagementObjectiveDashboard } from '../meta/primaryDesignatedManagementObjective'
import { primaryForestPercentOfForestArea } from '../meta/primaryForestPercentOfForestArea'

type DashboardItemFactory = (cycle: Cycle, region: boolean) => DashboardItem

const defaultDashboardItemFactories: Array<DashboardItemFactory> = [
  forestArea,
  forestGrowingStockAndCarbonDashboard,
  forestAreaPercentOfLandArea,
  primaryForestPercentOfForestArea,
  forestAreaWithinProtectedAreas,
  forestOwnership,
  primaryDesignatedManagementObjectiveDashboard,
  naturallyRegeneratingForestArea,
]

const dashboardItemFactoriesMap: Record<AssessmentName, Record<CycleName, Array<DashboardItemFactory>>> = {
  [AssessmentNames.fra]: {
    '2020': defaultDashboardItemFactories,
    '2025': defaultDashboardItemFactories,
  },
}

const getDashboardItemFactories = (
  assessmentName: AssessmentName,
  cycleName: CycleName
): Array<DashboardItemFactory> => {
  return dashboardItemFactoriesMap[assessmentName]?.[cycleName] || []
}

const getDashboardItems = (assessmentName: AssessmentName, cycle: Cycle, region: boolean): Array<DashboardItem> => {
  const factories = getDashboardItemFactories(assessmentName, cycle.name)
  return factories.map((factory) => factory(cycle, region))
}

export type Dashboard = ReadonlyArray<DashboardItem>

export const useDashboardItems = (): Dashboard => {
  const { assessmentName } = useAssessmentRouteParams()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const isRegion = !Areas.isISOCountry(countryIso)

  return useMemo<Dashboard>(() => {
    return getDashboardItems(assessmentName, cycle, isRegion)
  }, [assessmentName, cycle, isRegion])
}
