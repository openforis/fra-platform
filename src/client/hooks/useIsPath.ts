import { matchPath, useLocation, useParams } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { AssessmentName } from '@meta/assessment'

export const useIsPath = ({ path, exact = true }: { path: string; exact?: boolean }): boolean => {
  const { pathname } = useLocation()
  return Boolean(matchPath({ path, end: exact }, pathname))
}

export const useIsHome = () => useIsPath({ path: '/' })

export const useIsAssessment = () =>
  useIsPath({ path: `${ClientRoutes.Assessment.Root.path.absolute}/*`, exact: false })

export const useIsAdmin = () => useIsPath({ path: `${ClientRoutes.Admin.Root.path.absolute}/*`, exact: false })

export const useIsLogin = () => useIsPath({ path: `${ClientRoutes.Login.Root.path.absolute}/*`, exact: false })

export const useIsPrint = () => ({
  print: useIsPath({ path: `${ClientRoutes.Assessment.Print.path.absolute}/*`, exact: false }),
  onlyTables: useIsPath({ path: `${ClientRoutes.Assessment.PrintTables.path.absolute}`, exact: true }),
})

export const useIsPanEuropean = () => {
  const { assessmentName } = useParams<{ assessmentName: AssessmentName }>()
  return assessmentName === 'paneuropean' || assessmentName === 'panEuropean'
}
