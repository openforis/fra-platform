import { matchPath, useLocation } from 'react-router'

import { BasePaths } from '@client/basePaths'

const useIsPath = ({ path, exact = true }: any) => {
  const { pathname } = useLocation()
  return Boolean(matchPath(pathname, { path, exact }))
}

export const useIsHome = () => useIsPath({ path: BasePaths.Root() })

export const useIsAssessment = () =>
  useIsPath({ path: [BasePaths.Assessment.root(), BasePaths.Assessment.section()], exact: false })

export const useIsAdmin = () => useIsPath({ path: BasePaths.Admin.root(), exact: false })

export const useIsLogin = () => useIsPath({ path: [BasePaths.Login.root(), BasePaths.Login.resetPassword()] })
