import { AppSelectors } from '@webapp/store/app/app.slice'
import { useAppSelector } from '@webapp/store/store'
import { useIsHome, useIsAdmin } from '../../../components/hooks/useIsPath'

export default (): string | null => {
  const countryIso = useAppSelector(AppSelectors.selectCountryIso)
  const isHome = useIsHome()
  const isAdmin = useIsAdmin()

  return isHome || isAdmin ? null : countryIso
}
