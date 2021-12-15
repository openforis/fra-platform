import { useCountryIso } from './useCountryIso'

export const useNavigationVisible = (): boolean => {
  const countryIso = useCountryIso()

  return !!countryIso
}
