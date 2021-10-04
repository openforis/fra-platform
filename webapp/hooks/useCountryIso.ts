import { CountryIso } from '@core/country'
import { useAppSelector } from '@webapp/store'
import { useIsHome, useIsAdmin } from './useIsPath'

export default (): CountryIso | null => {
  const { countryIso } = useAppSelector((state) => state.app)
  const isHome = useIsHome()
  const isAdmin = useIsAdmin()

  return isHome || isAdmin ? null : countryIso
}
