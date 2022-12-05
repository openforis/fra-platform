import { CountryIso } from '@meta/area'
import { CycleUuid } from '@meta/assessment'
import { RoleName, Users } from '@meta/user'
import { UserRoles } from '@meta/user/userRoles'

import { useCountries, useCycle } from '@client/store/assessment'
import { useUser, useUserCountries } from '@client/store/user'

export const useUserCountryISOs = (): Record<CycleUuid, Record<string, Array<CountryIso>>> => {
  const cycle = useCycle()
  const user = useUser()
  const userCountries = useUserCountries()
  const allCountries = useCountries()
  const userCountryISOs: Record<CycleUuid, Record<string, Array<CountryIso>>> = {}

  if (Users.isAdministrator(user)) {
    // For admin, show only 'current' cycle countries
    if (!userCountryISOs[cycle.uuid]) userCountryISOs[cycle.uuid] = {}
    userCountryISOs[cycle.uuid][RoleName.ADMINISTRATOR] = [...userCountries]
  } else {
    user?.roles.forEach((role) => {
      if (!userCountryISOs[role.cycleUuid]) userCountryISOs[role.cycleUuid] = {}
      if (!Array.isArray(userCountryISOs[role.cycleUuid][role.role])) userCountryISOs[role.cycleUuid][role.role] = []
      userCountryISOs[role.cycleUuid][role.role].push(role.countryIso)
    })

    if (!userCountryISOs[cycle.uuid]) userCountryISOs[cycle.uuid] = {}

    // For no user role, show only current cycle countries
    userCountryISOs[cycle.uuid][UserRoles.noRole.role] = allCountries
      .map((c) => c.countryIso)
      .filter((countryIso: CountryIso) => !userCountries?.includes(countryIso))
  }

  return userCountryISOs
}
