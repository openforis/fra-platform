import { useSelector } from 'react-redux'
import * as UserState from '@webapp/store/user/state'
import * as Fra from '@common/assessment/fra'
import { useI18n } from '@webapp/components/hooks'
import { Area } from '@common/country'

export const sortCountries = (countries, i18n) => {
  const compareListName = Area.getCompareListName(i18n)
  const compareCountries = (country1, country2) => compareListName(country1.countryIso, country2.countryIso)
  const res = {}
  Object.keys(countries).forEach((role) => {
    res[role] = [...countries[role]].sort(compareCountries)
  })
  return res
}

export const useUserCountries = () => {
  const i18n = useI18n()
  const userCountries = useSelector(UserState.getUserAssesmentRoles(Fra.type))
  return sortCountries(userCountries, i18n)
}

export const useUserCountriesAsList = () => {
  const userCountries = useUserCountries()
  return Object.values(userCountries).flat()
}
