import { useParams } from 'react-router-dom'
import { CountryIso } from '@meta/area'
import { useIsHome, useIsLogin } from '@client/hooks/useIsPath'

export const useCountryIso = (): CountryIso => {
  // TODO: get this from store if not in url
  const { countryIso } = useParams<{ countryIso: CountryIso }>()

  if (useIsHome() || useIsLogin()) return null

  return countryIso
}
