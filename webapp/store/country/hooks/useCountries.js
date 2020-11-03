import { Area } from '@common/country'
import { useI18n } from '@webapp/components/hooks'
import { useDispatch, useSelector } from 'react-redux'
import * as CountryActions from '@webapp/store/country/actions'
import * as CountryState from '@webapp/app/country/countryState'
import { useEffect } from 'react'

export const sortCountries = (countries, i18n) => {
  const _compareListName = Area.getCompareListName(i18n)
  const _compareCountries = (country1, country2) => _compareListName(country1.countryIso, country2.countryIso)

  return Object.fromEntries(
    Object.entries(countries).map(([role, roleCountries]) => [role, [...roleCountries].sort(_compareCountries)])
  )
}

export const useCountries = () => {
  const i18n = useI18n()
  const dispatch = useDispatch()
  const countries = useSelector(CountryState.getCountries)

  useEffect(() => {
    dispatch(CountryActions.updateCountries(sortCountries(countries, i18n)))
  }, [i18n.language])

  return countries
}
