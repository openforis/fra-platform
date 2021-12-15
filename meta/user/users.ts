import { User } from './user'
import { RoleName, UserRole } from './userRole'

const isAdministrator = (user: User) => user.roles.filter((role: UserRole<any>) => role.role === RoleName.ADMINISTRATOR)

export const Users = {
  isAdministrator,
}
