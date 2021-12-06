import { matchPath, useLocation } from 'react-router'

import { BasePaths } from '@client/pages/PageRoutes/basePaths'

const useIsPath = ({ path, exact = true }: any) => {
  const { pathname } = useLocation()
  return Boolean(matchPath(pathname, { path, exact }))
}

export const useIsAssessment = () =>
  useIsPath({ path: [BasePaths.Assessment.root(), BasePaths.Assessment.section()], exact: false })
