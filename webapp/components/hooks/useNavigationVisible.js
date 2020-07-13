import { useSelector } from 'react-redux'

import * as NavigationState from '@webapp/app/components/navigation/navigationState'

import useCountryIso from './useCountryIso'

export const useNavigationVisible = () => {
  const countryIso = useCountryIso()
  const navigationVisible = useSelector(NavigationState.isVisible)

  return navigationVisible && countryIso
}
