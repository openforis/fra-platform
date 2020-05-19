import { useSelector } from 'react-redux'
import * as NavigationState from '@webapp/app/components/navigation/navigationState'

import useCountryIso from './useCountryIso'
import useIsDataExportView from './useIsDataExportView'

export const useNavigationVisible = () => {
  const countryIso = useCountryIso()
  const dataExportView = useIsDataExportView()
  const navigationVisible = useSelector(NavigationState.isVisible)
  return navigationVisible && (countryIso || dataExportView)
}
