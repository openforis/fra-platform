import { Objects } from 'utils/objects'

import { User } from 'meta/user'

import { UserRoleAdapter, UserRoleDB } from 'server/repository/adapter/userRole'

export type UserDB = Omit<User, 'roles'> & {
  roles?: Array<UserRoleDB>
}

export const UserAdapter = (user?: UserDB): User | null => {
  if (!user) return null
  const { roles, ...rest } = user

  return {
    ...Objects.camelize(rest),
    roles: roles?.map(UserRoleAdapter) ?? [],
  }
}
