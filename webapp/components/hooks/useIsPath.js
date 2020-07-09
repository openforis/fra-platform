import { matchPath, useLocation } from 'react-router'

import * as BasePaths from '@webapp/main/basePaths'

const useIsPath = ({ path, exact = true }) => {
  const { pathname } = useLocation()
  const matchHome = Boolean(matchPath(pathname, { path, exact }))
  return matchHome
}

export const useIsHome = () => useIsPath({ path: BasePaths.root })

export const useIsLogin = () => useIsPath({ path: [BasePaths.login, BasePaths.resetPassword] })
