import { useSelector } from 'react-redux'
import * as UserState from '@webapp/store/user/state'
import FRA from '@common/assessment/fra'
import { useI18n } from '@webapp/components/hooks'
import { Area } from '@common/country'

export const sortCountries = (countries: any, i18n: any) => {
  const compareListName = Area.getCompareListName(i18n)
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
