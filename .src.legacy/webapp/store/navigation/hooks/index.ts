import { useMediaQuery } from 'react-responsive'

import { Objects } from '@core/utils'
import { Breakpoints } from '@webapp/utils/breakpoints'

import { useCountryIso } from '@webapp/store/app'
import { useAppSelector } from '@webapp/store'

export const useNavigationVisible = (): boolean => {
  const countryIso = useCountryIso()
  const navigationVisible = useAppSelector((state) => state.navigation?.visible)
  const laptop = useMediaQuery({ minWidth: Breakpoints.laptop })

  return laptop
    ? (navigationVisible === true || Objects.isEmpty(navigationVisible)) && Boolean(countryIso)
    : navigationVisible
}
