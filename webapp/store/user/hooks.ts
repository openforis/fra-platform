import { i18n } from 'i18next'
import { useSelector } from 'react-redux'

import { Areas } from '@core/country'
import { FRA } from '@core/assessment'
import { useI18n } from '@webapp/hooks'
import * as UserState from '@webapp/store/user/state'

export const sortCountries = (countries: any, i18n: i18n) => {
  const compareListName = Areas.getCompareListName(i18n)
  const compareCountries = (country1: any, country2: any) => compareListName(country1.countryIso, country2.countryIso)
  const res: any = {}
  Object.keys(countries).forEach((role) => {
    res[role] = [...countries[role]].sort(compareCountries)
  })
  return res
}

export const useUserCountries = () => {
  const i18n = useI18n()
  const userCountries = useSelector(UserState.getUserAssesmentRoles(FRA.type))
  return sortCountries(userCountries, i18n)
}

export const useUserCountriesAsList = () => {
  const userCountries = useUserCountries()
  return Object.values(userCountries).flat()
}
