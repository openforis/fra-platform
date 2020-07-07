import { useSelector } from 'react-redux'
import { matchPath, useLocation } from 'react-router'

import * as NavigationState from '@webapp/app/components/navigation/navigationState'

import useCountryIso from './useCountryIso'

export const useNavigationVisible = () => {
  const countryIso = useCountryIso()
  const navigationVisible = useSelector(NavigationState.isVisible)
  const { pathname } = useLocation()
  const matchHome = matchPath(pathname, { path: '/', exact: true })

  return navigationVisible && countryIso && !matchHome
}
