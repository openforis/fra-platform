import { matchPath, useLocation } from 'react-router'

import * as BasePaths from '@webapp/main/basePaths'

const useIsPath = ({ path, exact = true }: any) => {
  const { pathname } = useLocation()
  return Boolean(matchPath(pathname, { path, exact }))
}

export const useIsHome = () => useIsPath({ path: BasePaths.root })

export const useIsAdmin = () => useIsPath({ path: BasePaths.admin, exact: false })

export const useIsLogin = () => useIsPath({ path: [BasePaths.login, BasePaths.resetPassword] })

export const useIsUsers = () => useIsPath({ path: [BasePaths.user, BasePaths.resetPassword] })

export const useIsAssessment = () =>
  useIsPath({ path: [BasePaths.assessmentHome, BasePaths.assessmentSection], exact: false })
