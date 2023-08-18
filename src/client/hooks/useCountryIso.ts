import { useMatch, useParams } from 'react-router-dom'

import { CountryIso } from 'meta/area'

import { useIsAdminRoute, useIsCycleLandingRoute, useIsLoginRoute } from 'client/hooks/useIsRoute'

export const useCountryIso = (): CountryIso => {
  const { countryIso } = useParams<{ countryIso: CountryIso }>()

  const match = useMatch('assessments/:assessmentName/:cycleName/:countryIso/*')

  const isAdmin = useIsAdminRoute()
  const isLogin = useIsLoginRoute()
  const isHome = useIsCycleLandingRoute()

  if (isAdmin || isHome || isLogin) return null

  return countryIso ?? (match?.params.countryIso as CountryIso) ?? null
}
