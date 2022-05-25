import { noRole } from '@common/countryRole'

import { CountryIso } from '@meta/area'
import { RoleName, Users } from '@meta/user'

import { useCountries } from '@client/store/assessment'
import { useUser, useUserCountries } from '@client/store/user'

export const useUserCountryISOs = (): Record<string, Array<CountryIso>> => {
  const user = useUser()
  const userCountries = useUserCountries()
  const allCountries = useCountries()
  const userCountryISOs: Record<string, Array<CountryIso>> = {}

  if (Users.isAdministrator(user)) {
    userCountryISOs[RoleName.ADMINISTRATOR] = [...userCountries]
  } else {
    user?.roles.forEach((role) => {
      if (!Array.isArray(userCountryISOs[role.role])) userCountryISOs[role.role] = []
      userCountryISOs[role.role].push(role.countryIso)
    })

    userCountryISOs[noRole.role] = allCountries
      .map((c) => c.countryIso)
      .filter((countryIso: CountryIso) => !userCountries?.includes(countryIso))
  }

  return userCountryISOs
}
