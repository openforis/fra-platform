import { User } from '@meta/user'

import { useAppSelector } from '@client/store/store'

export const useCountryUsers = (): Array<User> => useAppSelector((state) => state.userManagement.countryUsers)
