import { useCountryIso } from 'client/hooks'
import { useAppSelector } from 'client/store'

export const useNavigationVisible = (): boolean => {
  const countryIso = useCountryIso()
  const navigationVisible = useAppSelector((state) => state.ui.navigation.visible)

  if (!countryIso) {
    return false
  }

  return navigationVisible
}
