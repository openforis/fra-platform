import { matchPath, useLocation } from 'react-router-dom'

import { ClientRoutes } from '@client/clientRoutes'

const useIsPath = ({ path, exact = true }: { path: string; exact?: boolean }): boolean => {
  const { pathname } = useLocation()
  return Boolean(matchPath({ path, end: exact }, pathname))
}

export const useIsHome = () => useIsPath({ path: '/' })

export const useIsAssessment = () =>
  useIsPath({ path: `${ClientRoutes.Assessment.Root.path.absolute}/*`, exact: false })

export const useIsAdmin = () => useIsPath({ path: `${ClientRoutes.Admin.Root.path.absolute}/*`, exact: false })

export const useIsLogin = () => useIsPath({ path: `${ClientRoutes.Login.Root.path.absolute}/*`, exact: false })
