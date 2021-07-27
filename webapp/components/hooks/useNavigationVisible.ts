import { useSelector } from 'react-redux'

import * as NavigationState from '@webapp/components/Navigation/navigationState'

import useCountryIso from './useCountryIso'

export const useNavigationVisible = () => {
  const countryIso = useCountryIso()
  const navigationVisible = useSelector(NavigationState.isVisible)

  return navigationVisible && Boolean(countryIso)
}
