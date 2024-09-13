import { RoleName, User } from 'meta/user'

import { useAppSelector } from 'client/store/store'

const roleNames = [
  RoleName.ADMINISTRATOR,
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
  RoleName.VIEWER,
]

export const useUserToEdit = (): User => useAppSelector((state) => state.ui.userManagement.user)

export const useUsers = (): Array<User> => useAppSelector((state) => state.ui.userManagement.users)

export const useRoleNames = (): Array<RoleName> => roleNames

export const useUsersCount = (): { [key in keyof typeof RoleName | 'total']?: number } =>
  useAppSelector((state) => state.ui.userManagement.count)
