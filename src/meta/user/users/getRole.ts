import { AreaCode } from 'meta/area/areaCode'
import { Cycle } from 'meta/assessment/cycle'
import { RoleName } from 'meta/user/role/name'
import { UserRole } from 'meta/user/role/role'
import { User } from 'meta/user/user'
import { isAdministrator } from 'meta/user/users/isRole'

export const getRole = (user: User, countryIso: AreaCode, cycle: Cycle): UserRole<RoleName> => {
  if (isAdministrator(user)) return user.roles[0]

  return user?.roles?.find(
    (userRole: UserRole<never>) => userRole?.countryIso === countryIso && userRole?.cycleUuid === cycle.uuid
  )
}
