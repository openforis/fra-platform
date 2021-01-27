import { useSelector } from 'react-redux'
import * as UserState from '@webapp/store/user/state'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as Fra from '@common/assessment/fra'
import { useI18n } from '@webapp/components/hooks'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { Area } from '@common/country'

export const sortCountries = (countries: any, i18n: any) => {
  const compareListName = Area.getCompareListName(i18n)
  const compareCountries = (country1: any, country2: any) => compareListName(country1.countryIso, country2.countryIso)
  const res = {}
  Object.keys(countries).forEach((role) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2550) FIXME: Property 'flat' does not exist on type 'unknown[]'... Remove this comment to see the full error message
  return Object.values(userCountries).flat()
}
