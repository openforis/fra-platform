import { useMemo } from 'react'

import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { User, Users } from 'meta/user'

import { useCountriesRecord } from 'client/store/area/hooks/countries'
import { useAppSelector } from 'client/store/hooks'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useLanguage } from 'client/hooks/language'

export const useUser = (): User | undefined => useAppSelector((state) => state.user)

export const useUserCountries = (): Array<CountryIso> => {
  const language = useLanguage()
  const cycle = useCycle()
  const user = useUser()
  const countriesRecord = useCountriesRecord()
  const isAdministrator = Users.isAdministrator(user)

  return useMemo<Array<CountryIso>>(() => {
    const compareFn = (c1: Country, c2: Country): number => Areas.getCompareListName(c1, c2, language)

    if (isAdministrator) {
      return Object.values(countriesRecord)
        .slice()
        .sort(compareFn)
        .map((c) => c.countryIso)
    }

    const userCountryIsos = (user?.roles ?? []).filter((r) => r.cycleUuid === cycle.uuid).map((r) => r.countryIso)

    const userCountries = userCountryIsos.map((countryIso) => countriesRecord[countryIso])

    return userCountries
      .slice()
      .sort(compareFn)
      .map((c) => c.countryIso)
  }, [countriesRecord, cycle.uuid, isAdministrator, language, user?.roles])
}
