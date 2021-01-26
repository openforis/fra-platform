import { useUserCountries } from '@webapp/store/user'
import { isAdministrator, isReviewer, reviewer } from '@common/countryRole'
import { roleAllowances } from '@common/assessmentRoleAllowance'
import { useCountryIso, useUserInfo } from '@webapp/components/hooks'
import Country from '@common/country/country'

export const useCanToggleLock = () => {
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const userCountries = useUserCountries()

  if (isAdministrator(userInfo)) {
    return true
  }

  if (isReviewer(countryIso, userInfo)) {
    const country = userCountries[reviewer.role].find((_country) => countryIso === Country.getCountryIso(_country))
    const status = Country.getFra2020Assessment(country)
    return roleAllowances[reviewer.role].data.includes(status)
  }

  return false
}
