import { matchPath, useLocation } from 'react-router-dom'

import { AssessmentNames } from 'meta/assessment/assessment'
import { Routes } from 'meta/routes'

import { useAssessmentRouteParams } from 'client/hooks/useRouteParams'

export const useIsRoute = ({ exact = true, path }: { path: string; exact?: boolean }): boolean => {
  const { pathname } = useLocation()
  return Boolean(matchPath({ path, end: exact }, pathname))
}
export const useIsCycleLandingRoute = (): boolean => useIsRoute({ path: Routes.Cycle.path.absolute })
export const useIsCountryRoute = (): boolean => useIsRoute({ path: Routes.Country.path.absolute, exact: false })
export const useIsAdminRoute = (): boolean => useIsRoute({ path: Routes.Admin.path.absolute, exact: false })
export const useIsLoginRoute = (): boolean => useIsRoute({ path: Routes.Login.path.absolute, exact: false })
export const useIsPrintRoute = (): { print: boolean; onlyTables: boolean } => ({
  print: useIsRoute({ path: Routes.Print.path.absolute, exact: false }),
  onlyTables: useIsRoute({ path: Routes.PrintTables.path.absolute, exact: true }),
})
export const useIsPanEuropeanRoute = (): boolean => {
  const { assessmentName } = useAssessmentRouteParams()
  return assessmentName === AssessmentNames.panEuropean
}
export const useIsGeoRoute = (): boolean => useIsRoute({ path: Routes.Geo.path.absolute, exact: false })
export const useIsInvitationLocalRoute = (): boolean =>
  useIsRoute({ path: Routes.LoginInvitationLocal.path.absolute, exact: false })
