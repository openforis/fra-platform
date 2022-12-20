import { matchPath, useLocation, useParams } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { AssessmentName, AssessmentNames } from '@meta/assessment'

export const useIsPath = ({ path, exact = true }: { path: string; exact?: boolean }): boolean => {
  const { pathname } = useLocation()
  return Boolean(matchPath({ path, end: exact }, pathname))
}

export const useIsHome = () => useIsPath({ path: ClientRoutes.Assessments.Cycle.path.absolute })

export const useIsAssessment = () =>
  useIsPath({ path: `${ClientRoutes.Assessments.Country.path.absolute}/*`, exact: false })

export const useIsAdmin = () => useIsPath({ path: `${ClientRoutes.Admin.Root.path.absolute}/*`, exact: false })

export const useIsLogin = () => useIsPath({ path: `${ClientRoutes.Login.Root.path.absolute}/*`, exact: false })

export const useIsPrint = () => ({
  print: useIsPath({ path: `${ClientRoutes.Assessment.Print.path.absolute}/*`, exact: false }),
  onlyTables: useIsPath({ path: `${ClientRoutes.Assessment.PrintTables.path.absolute}`, exact: true }),
})

export const useIsPanEuropean = () => {
  const { assessmentName } = useParams<{ assessmentName: AssessmentName }>()
  return assessmentName === AssessmentNames.panEuropean
}
