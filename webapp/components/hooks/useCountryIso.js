import { useSelector } from 'react-redux'
import * as AppState from '@webapp/app/appState'

import { useIsHome, useIsAdmin } from './useIsPath'

export default () => {
  const countryIso = useSelector(AppState.getCountryIso)
  const isHome = useIsHome()
  const isAdmin = useIsAdmin()

  return isHome || isAdmin ? null : countryIso
}
