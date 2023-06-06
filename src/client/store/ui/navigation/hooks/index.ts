import { useAppSelector } from 'client/store'
import { useCountryIso } from 'client/hooks'

export const useNavigationVisible = (): boolean => {
  const countryIso = useCountryIso()
  const navigationVisible = useAppSelector((state) => state.ui.navigation.visible)

  if (!countryIso) {
    return false
  }

  return navigationVisible
}
