import { CountryUserSummary, User } from 'meta/user'

import { useAppSelector } from 'client/store/store'

export const useUserToEdit = (): User => useAppSelector((state) => state.ui.userManagement.user)

/**
 * @deprecated
 */
export const useUsers = (): Array<CountryUserSummary> => useAppSelector((state) => state.ui.userManagement.users)
