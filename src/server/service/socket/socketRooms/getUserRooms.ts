import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

import { adminRoom, getCountryRoom, getUserRoom } from './_roomNames'

export const getUserRooms = (user: User): Array<string> => {
  const userRoom = getUserRoom(user.id)

  if (Users.isAdministrator(user)) return [userRoom, adminRoom]

  const countryRooms = user.roles.map<string>((role) =>
    getCountryRoom({ countryIso: role.countryIso, cycleUuid: role.cycleUuid })
  )
  return [userRoom, ...countryRooms]
}
