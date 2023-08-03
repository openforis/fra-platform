import { useAppSelector } from 'client/store'
import { useCountryIso, useIsGeoPage } from 'client/hooks'

export const useNavigationVisible = (): boolean => {
  const countryIso = useCountryIso()
  const isInGeoPage = useIsGeoPage()

  const navigationVisible = useAppSelector((state) => state.ui.navigation.visible)

  if (!countryIso || isInGeoPage) {
    return false
  }

  return navigationVisible
}
