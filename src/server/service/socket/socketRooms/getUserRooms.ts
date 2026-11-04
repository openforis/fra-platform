import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

import { adminRoom, getCountryRoom, getUserRoom } from './_roomNames'

// Rooms a logged-in user's socket joins when it connects
export const getUserRooms = (user: User): Array<string> => {
  const userRoom = getUserRoom(user.id)

  // Admins get every country's events through the admins room
  if (Users.isAdministrator(user)) return [userRoom, adminRoom]

  // One room per role, for its country and cycle
  const countryRooms = user.roles.map<string>((role) =>
    getCountryRoom({ countryIso: role.countryIso, cycleUuid: role.cycleUuid })
  )
  return [userRoom, ...countryRooms]
}
