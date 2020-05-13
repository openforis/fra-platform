import { useLocation, matchPath } from 'react-router'
import * as BasePaths from '@webapp/main/basePaths'

export default () => {
  const { pathname } = useLocation()
  return matchPath(pathname, { path: BasePaths.dataExport })
}
