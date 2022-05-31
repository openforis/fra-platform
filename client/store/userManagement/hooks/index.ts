import { User } from '@meta/user'

import { useAppSelector } from '@client/store/store'

export const useUsers = (): Array<User> => useAppSelector((state) => state.userManagement.users)
