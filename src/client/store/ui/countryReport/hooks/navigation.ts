import { useAppSelector } from 'client/store/hooks'
import { CountryReportSelectors } from 'client/store/ui/countryReport/selectors'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useNavigationVisible = (): boolean => {
  const { countryIso } = useCountryRouteParams()

  const navigationVisible = useAppSelector(CountryReportSelectors.isNavigationVisible)

  if (!countryIso) {
    return false
  }

  return navigationVisible
}
