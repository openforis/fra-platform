import { CountryIso } from '@meta/area'
import { RoleName, User } from '@meta/user'

import { useAppSelector } from '@client/store/store'

export const useUserToEdit = (): User => useAppSelector((state) => state.ui.userManagement.user)

export const useUsers = (): Array<User> => useAppSelector((state) => state.ui.userManagement.users)

export const useFilters = (): { countries: Array<CountryIso>; roles: Array<RoleName> } =>
  useAppSelector((state) => state.ui.userManagement.filters)
