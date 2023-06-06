import { useMatch, useParams } from 'react-router-dom'

import { CountryIso } from 'meta/area'

import { useIsAdmin, useIsCycleLanding, useIsLogin, useIsUserEditPage } from 'client/hooks/useIsPath'

export const useCountryIso = (): CountryIso => {
  const { countryIso } = useParams<{ countryIso: CountryIso }>()

  const match = useMatch('assessments/:assessmentName/:cycleName/:countryIso/*')

  const isAdmin = useIsAdmin()
  const isLogin = useIsLogin()
  const isHome = useIsCycleLanding()
  const isUserEditPage = useIsUserEditPage()

  if (isAdmin || isHome || isLogin || isUserEditPage) return null

  return countryIso ?? (match?.params.countryIso as CountryIso) ?? null
}
