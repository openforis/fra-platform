import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
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

export const useFilters = (): { countries: Array<CountryIso>; fullName: string; roles: Array<RoleName> } =>
  useAppSelector((state) => state.ui.userManagement.filters)

export const useFilteredRoleNames = (): Array<RoleName> =>
  useAppSelector((state) =>
    Objects.isEmpty(state.ui.userManagement.filters.roles) ? roleNames : state.ui.userManagement.filters.roles
  )

export const useRoleNames = (): Array<RoleName> => roleNames

export const useUsersCount = (): { [key in keyof typeof RoleName | 'total']?: number } =>
  useAppSelector((state) => state.ui.userManagement.count)
