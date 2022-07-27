import { useMatch, useParams } from 'react-router-dom'

import { CountryIso } from '@meta/area'

import { useIsHome, useIsLogin } from '@client/hooks/useIsPath'

export const useCountryIso = (): CountryIso => {
  const { countryIso } = useParams<{ countryIso: CountryIso }>()
  const match = useMatch(':countryIso/*')

  if (useIsHome() || useIsLogin()) return null

  return countryIso ?? (match.params.countryIso as CountryIso)
}
