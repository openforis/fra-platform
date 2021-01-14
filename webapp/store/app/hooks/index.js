import { useDispatch, useSelector } from 'react-redux'

import * as AppState from '@webapp/app/appState'
import { Area, Country } from '@common/country'
import { useI18n, useOnUpdate } from '@webapp/components/hooks'

import * as AppActions from '../actions'

export const useAssessmentType = () => useSelector(AppState.getAssessmentType)

export const sortCountries = (countries, i18n) => {
  const compareListName = Area.getCompareListName(i18n)
  const compareCountries = (country1, country2) => compareListName(country1.countryIso, country2.countryIso)
  return [...countries].sort(compareCountries)
}

export const useCountries = () => {
  const i18n = useI18n()
  const dispatch = useDispatch()
  const countries = useSelector(AppState.getCountries)

  useOnUpdate(() => {
    dispatch(AppActions.updateCountries(sortCountries(countries, i18n)))
  }, [i18n])

  return countries
}

export const useCountriesPanEuropean = () =>
  useCountries().filter((country) => Country.getRegionCodes(country).includes(Area.levels.forest_europe))

export const sortRegions = (regionsToSort, i18n) => {
  const compareListName = Area.getCompareListName(i18n)
  return [...regionsToSort].sort(compareListName)
}

export const useRegions = () => {
  const i18n = useI18n()
  const dispatch = useDispatch()
  const regions = useSelector(AppState.getRegions)

  useOnUpdate(() => {
    dispatch(AppActions.updateRegions(sortRegions(regions, i18n)))
  }, [i18n])

  return regions
}

export const sortRegionGroups = (regionGroups, i18n) => {
  return Object.fromEntries(Object.entries(regionGroups).map(([key, regions]) => [key, sortRegions(regions, i18n)]))
}

export const useRegionGroups = () => {
  const i18n = useI18n()
  const dispatch = useDispatch()
  const regionGroups = useSelector(AppState.getRegionGroups)

  useOnUpdate(() => {
    dispatch(AppActions.updateRegionGroups(sortRegionGroups(regionGroups, i18n)))
  }, [i18n])

  return regionGroups
}
