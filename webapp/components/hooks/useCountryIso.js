import { useSelector } from 'react-redux'
import * as AppState from '@webapp/app/appState'

import { useIsHome } from './useIsPath'

export default () => {
  const countryIso = useSelector(AppState.getCountryIso)
  const isHome = useIsHome()
  return isHome ? null : countryIso
}
