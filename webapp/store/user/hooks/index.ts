import { i18n as I18n } from 'i18next'

import { useI18n } from '@webapp/hooks'
import { FRA } from '@core/assessment'
import { Areas, CountryIso } from '@core/country'
import { User } from '@core/auth'
import { useAppSelector } from '@webapp/store'

const sortCountries = (countries: Array<Record<string, { countryIso: CountryIso }>>, i18n: I18n) => {
  const compareListName = Areas.getCompareListName(i18n)
  const compareCountries = (country1: any, country2: any) => compareListName(country1.countryIso, country2.countryIso)
  const res: any = {}
  Object.keys(countries).forEach((role: string) => {
    res[role] = [...countries[role]].sort(compareCountries)
  })
  return res
}

export const useUserCountries = () => {
  const i18n = useI18n()
  const userCountries = useAppSelector((state) => state?.user?.role?.[FRA.type] ?? {})
  return sortCountries(userCountries, i18n)
}

export const useUserCountriesAsList = () => {
  const userCountries = useUserCountries()
  return Object.values(userCountries).flat()
}

export const useUserInfo = (): User => useAppSelector((state) => state.user)
