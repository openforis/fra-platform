import { matchPath, useLocation, useParams } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { AssessmentName, AssessmentNames } from 'meta/assessment'

export const useIsPath = ({ path, exact = true }: { path: string; exact?: boolean }): boolean => {
  const { pathname } = useLocation()
  return Boolean(matchPath({ path, end: exact }, pathname))
}

export const useIsCycleLanding = () => useIsPath({ path: ClientRoutes.Assessment.Cycle.Landing.path.absolute })

export const useIsCountry = () =>
  useIsPath({ path: `${ClientRoutes.Assessment.Cycle.Country.Landing.path.absolute}/*`, exact: false })

export const useIsAdmin = () =>
  useIsPath({ path: `${ClientRoutes.Assessment.Cycle.Admin.Root.path.absolute}/*`, exact: false })

export const useIsLogin = () =>
  useIsPath({ path: `${ClientRoutes.Assessment.Cycle.Login.Root.path.absolute}/*`, exact: false })

export const useIsUserEditPage = () =>
  useIsPath({ path: `${ClientRoutes.Assessment.Cycle.Users.User.path.absolute}/*`, exact: false })

export const useIsPrint = () => ({
  print: useIsPath({ path: `${ClientRoutes.Assessment.Cycle.Country.Print.path.absolute}/*`, exact: false }),
  onlyTables: useIsPath({ path: `${ClientRoutes.Assessment.Cycle.Country.PrintTables.path.absolute}`, exact: true }),
})

export const useIsPanEuropean = () => {
  const { assessmentName } = useParams<{ assessmentName: AssessmentName }>()
  return assessmentName === AssessmentNames.panEuropean
}

export const useIsGeoPage = () =>
  useIsPath({ path: `${ClientRoutes.Assessment.Cycle.Country.Geo.path.absolute}/*`, exact: false })
