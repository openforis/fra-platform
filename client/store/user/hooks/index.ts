import { useAppSelector } from '@client/store'
import { User } from '@core/meta/user'

export const useUser = (): User => useAppSelector((state) => state.user)
