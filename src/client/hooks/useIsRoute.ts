import { matchPath, useLocation } from 'react-router-dom'

import { AssessmentNames } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useAssessmentRouteParams } from 'client/hooks/useRouteParams'

export const useIsRoute = ({ path, exact = true }: { path: string; exact?: boolean }): boolean => {
  const { pathname } = useLocation()
  return Boolean(matchPath({ path, end: exact }, pathname))
}

export const useIsCycleLandingRoute = () => useIsRoute({ path: Routes.Cycle.path.absolute })

export const useIsCountryRoute = () => useIsRoute({ path: Routes.Country.path.absolute, exact: false })

export const useIsAdminRoute = () => useIsRoute({ path: Routes.Admin.path.absolute, exact: false })

export const useIsLoginRoute = () => useIsRoute({ path: Routes.Login.path.absolute, exact: false })

export const useIsPrintRoute = () => ({
  print: useIsRoute({ path: Routes.Print.path.absolute, exact: false }),
  onlyTables: useIsRoute({ path: Routes.PrintTables.path.absolute, exact: true }),
})

export const useIsPanEuropeanRoute = () => {
  const { assessmentName } = useAssessmentRouteParams()
  return assessmentName === AssessmentNames.panEuropean
}

export const useIsGeoRoute = () => useIsRoute({ path: Routes.Geo.path.absolute, exact: false })

export const useIsInvitationLocalRoute = () =>
  useIsRoute({ path: Routes.LoginInvitationLocal.path.absolute, exact: false })
