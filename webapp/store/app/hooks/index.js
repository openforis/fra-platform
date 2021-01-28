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

export const sortRegions = (regions, i18n) => {
  const compareListName = Area.getCompareListName(i18n)
  return [...regions].sort((r1, r2) => compareListName(r1.regionCode, r2.regionCode))
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

export const sortRegionGroups = (regionGroups) => {
  return [...regionGroups].sort((rg1, rg2) => rg1.order > rg2.order)
}

/**
 * regionGroup =
 {
    "id": 1,
    "name": "fra",
    "order": 0
  },
 */
export const useGroupedRegions = () => {
  const regionGroups = useSelector(AppState.getRegionGroups)

  const regions = useRegions()
  return regionGroups.map((rg) => ({
    ...rg,
    regions: regions.filter((region) => region.regionGroup === rg.id),
  }))
}

/**
 * Returns array of region_codes
 * @returns {*}
 */
export const useFraRegions = () => {
  const groupedRegions = useGroupedRegions()
  const _fraRegionGroup = groupedRegions.find((groupedRegion) => groupedRegion.name === 'fra')
  return _fraRegionGroup.regions.map((region) => region.regionCode)
}
