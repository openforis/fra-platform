import { useSelector } from 'react-redux'

import * as NavigationState from '@webapp/app/components/navigation/navigationState'

import useCountryIso from './useCountryIso'
import useIsHome from './useIsHome'

export const useNavigationVisible = () => {
  const countryIso = useCountryIso()
  const navigationVisible = useSelector(NavigationState.isVisible)
  const isHome = useIsHome()

  return navigationVisible && countryIso && !isHome
}
