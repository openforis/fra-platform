import { useParams, useRouteMatch } from 'react-router-dom'

import { CountryIso } from '@meta/area'

import { useIsHome, useIsLogin } from '@client/hooks/useIsPath'

export const useCountryIso = (): CountryIso => {
  const { countryIso } = useParams<{ countryIso: CountryIso }>()
  const match: { params: { countryIso?: CountryIso } } = useRouteMatch({ path: '/:countryIso', strict: true })

  if (useIsHome() || useIsLogin()) return null

  return countryIso ?? match.params.countryIso
}
