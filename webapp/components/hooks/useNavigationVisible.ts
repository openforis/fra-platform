import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import { Objects } from '@core/utils'
import * as NavigationState from '@webapp/components/Navigation/navigationState'
import { Breakpoints } from '@webapp/utils/breakpoints'

import useCountryIso from '../../store/app/hooks/useCountryIso'

export const useNavigationVisible = (): boolean => {
  const countryIso = useCountryIso()
  const navigationVisible = useSelector(NavigationState.isVisible) as boolean
  const laptop = useMediaQuery({ minWidth: Breakpoints.laptop })

  return laptop
    ? (navigationVisible === true || Objects.isEmpty(navigationVisible)) && Boolean(countryIso)
    : navigationVisible
}
