import { User } from './user'
import { RoleNames, UserRole } from './userRoles'

const isAdministrator = (user: User) =>
  user.roles.filter((role: UserRole<any>) => role.role === RoleNames.ADMINISTRATOR)

export const Users = {
  isAdministrator,
}
