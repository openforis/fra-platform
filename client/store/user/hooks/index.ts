import { useAppSelector } from '@client/store'
import { User, Users } from '@meta/user'
import { CountryIso } from '@meta/area'
import { useCountries } from '@client/store/assessment'

export const useUser = (): User | undefined => useAppSelector((state) => state.user)

export const useUserCountries = (): Array<CountryIso> => {
  const user = useUser()
  const countries = useCountries()
  const isAdministrator = Users.isAdministrator(user)
  if (isAdministrator) return countries
  return user?.roles.map((role) => role.countryIso)
}
