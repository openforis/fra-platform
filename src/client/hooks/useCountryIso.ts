import { useMatch, useParams } from 'react-router-dom'

import { CountryIso } from '@meta/area'

import { useIsCycleLanding, useIsLogin } from '@client/hooks/useIsPath'

export const useCountryIso = (): CountryIso => {
  const { countryIso } = useParams<{ countryIso: CountryIso }>()
  const match = useMatch('assessments/:assessmentName/:cycleName/:countryIso/*')

  const isLogin = useIsLogin()
  const isHome = useIsCycleLanding()

  if (isHome || isLogin) return null

  return countryIso ?? (match?.params.countryIso as CountryIso) ?? null
}
