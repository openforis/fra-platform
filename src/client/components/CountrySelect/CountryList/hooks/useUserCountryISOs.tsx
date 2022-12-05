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
    if (!userCountryISOs[RoleName.ADMINISTRATOR]) userCountryISOs[RoleName.ADMINISTRATOR] = {}
    userCountryISOs[RoleName.ADMINISTRATOR][cycle.uuid] = [...userCountries]
  } else {
    user?.roles.forEach((role) => {
      if (!userCountryISOs[role.role]) userCountryISOs[role.role] = {}
      if (!Array.isArray(userCountryISOs[role.role][role.cycleUuid])) userCountryISOs[role.role][role.cycleUuid] = []
      userCountryISOs[role.role][role.cycleUuid].push(role.countryIso)
    })

    if (!userCountryISOs[UserRoles.noRole.role]) userCountryISOs[UserRoles.noRole.role] = {}

    // For no user role, show only current cycle countries
    userCountryISOs[UserRoles.noRole.role][cycle.uuid] = allCountries
      .map((c) => c.countryIso)
      .filter((countryIso: CountryIso) => !userCountries?.includes(countryIso))
  }

  // noRole must be last
  return userCountryISOs
}
