import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas, CountryIso } from 'meta/area'
import { User, Users } from 'meta/user'

import { useCountries } from 'client/store/area/hooks/countries'
import { useAppSelector } from 'client/store/hooks'
import { useCycle } from 'client/store/meta/hooks/cycles'

export const useUser = (): User | undefined => useAppSelector((state) => state.user)

export const useUserCountries = (): Array<CountryIso> => {
  const { i18n } = useTranslation()
  const cycle = useCycle()
  const user = useUser()
  const countries = useCountries().map((c) => c.countryIso)
  const isAdministrator = Users.isAdministrator(user)
  // Return only current cycle countries for user
  const userRoles = user?.roles ?? []
  const userCountries = userRoles.filter((role) => cycle.uuid === role.cycleUuid).map((role) => role.countryIso)
  const compareListName = Areas.getCompareListName(i18n)

  return useMemo(() => {
    if (isAdministrator) return countries
    const compareFn = (c1: CountryIso, c2: CountryIso) => compareListName(c1, c2)
    return userCountries.sort(compareFn)
  }, [compareListName, countries, isAdministrator, userCountries])
}
