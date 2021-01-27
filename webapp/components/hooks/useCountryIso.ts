import { useSelector } from 'react-redux'
import * as AppState from '@webapp/store/app/state'

import { useIsHome, useIsAdmin } from './useIsPath'

export default () => {
  const countryIso = useSelector(AppState.getCountryIso)
  const isHome = useIsHome()
  const isAdmin = useIsAdmin()

  return isHome || isAdmin ? null : countryIso
}
