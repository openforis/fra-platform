import { User } from '@meta/user'

import { useAppSelector } from '@client/store/store'

export const useUserToEdit = (): User => useAppSelector((state) => state.userManagement.userToEdit)

export const useUsers = (): Array<User> => useAppSelector((state) => state.userManagement.users)
