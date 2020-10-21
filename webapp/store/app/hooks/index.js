import { useState } from 'react'
import { useSelector } from 'react-redux'

import * as AppState from '@webapp/app/appState'
import { Area, Country } from '@common/country'
import { useI18n, useOnUpdate } from '@webapp/components/hooks'

export const useAssessmentType = () => useSelector(AppState.getAssessmentType)

const sortCountries = (countries, i18n) => {
  const compareListName = Area.getCompareListName(i18n)
  const compareCountries = (country1, country2) => compareListName(country1.countryIso, country2.countryIso)
  return countries.sort(compareCountries)
}

export const useCountries = () => {
  const i18n = useI18n()
  const countries = useSelector(AppState.getCountries)

  const [countriesSorted, setCountriesSorted] = useState(() => sortCountries(countries, i18n))

  useOnUpdate(() => {
    setCountriesSorted([...sortCountries(countries, i18n)])
  }, [countries, i18n])

  return countriesSorted
}

export const useCountriesPanEuropean = () =>
  useCountries().filter((country) => Country.getRegionCodes(country).includes(Area.levels.europe))
