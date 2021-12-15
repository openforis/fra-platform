import { useAppSelector } from '@client/store'
import { User } from '@meta/user'

export const useUser = (): User | undefined => useAppSelector((state) => state.user)
