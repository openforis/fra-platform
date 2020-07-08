import { matchPath, useLocation } from 'react-router'

export default () => {
  const { pathname } = useLocation()
  const matchHome = Boolean(matchPath(pathname, { path: '/', exact: true }))
  return matchHome
}
