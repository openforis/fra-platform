import { useUserCountries } from '@webapp/store/user'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { isAdministrator, isReviewer, reviewer } from '@common/countryRole'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { roleAllowances } from '@common/assessmentRoleAllowance'
import { useCountryIso, useUserInfo } from '@webapp/components/hooks'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import Country from '@common/country/country'

export const useCanToggleLock = () => {
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const userCountries = useUserCountries()

  if (isAdministrator(userInfo)) {
    return true
  }

  if (isReviewer(countryIso, userInfo)) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const country = userCountries[reviewer.role].find((_country: any) => countryIso === Country.getCountryIso(_country))
    const status = Country.getFra2020Assessment(country)
    return roleAllowances[reviewer.role].data.includes(status)
  }

  return false
}
