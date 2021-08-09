import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AssessmentType, FRA } from '@core/assessment'
import { Areas, Country, Region, RegionCode, RegionGroup } from '@core/country'
import { useI18n } from '@webapp/components/hooks'
import * as AppState from '@webapp/store/app/state'

import * as AppActions from '../actions'

export const useAssessmentType = (): AssessmentType => {
  return useSelector(AppState.getAssessmentType) as AssessmentType
}

export const useCountries = (): Array<Country> => {
  const i18n = useI18n()
  const dispatch = useDispatch()
  const countries = useSelector(AppState.getCountries) as Array<Country>

  useEffect(() => {
    dispatch(AppActions.updateCountries(Areas.sortCountries(countries, i18n)))
  }, [i18n])

  return countries
}

export const useCountriesPanEuropean = (): Array<Country> =>
  useCountries().filter((country) => country.regionCodes.includes(RegionCode.FE))

export const useRegions = (): Array<Region> => {
  const i18n = useI18n()
  const dispatch = useDispatch()
  const regions = useSelector(AppState.getRegions) as Array<Region>

  useEffect(() => {
    dispatch(AppActions.updateRegions(Areas.sortRegions(regions, i18n)))
  }, [i18n])

  return regions
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
  const regionGroups = useSelector(AppState.getRegionGroups) as Array<RegionGroup>
  const regions = useRegions()

  return regionGroups.map((regionGroup) => ({
    ...regionGroup,
    regions: regions.filter((region) => region.regionGroup === regionGroup.id),
  }))
}

export const useSecondaryGroupedRegions = () => {
  const groupedRegions = useGroupedRegions()
  return groupedRegions.filter((rg) => rg.name === 'secondary')[0]
}

/**
 * Returns array of region_codes
 * @returns {*}
 */
export const useFraRegions = (): Array<RegionCode> => {
  const groupedRegions = useGroupedRegions()
  const _fraRegionGroup = groupedRegions.find((groupedRegion) => groupedRegion.name === FRA.type)
  return _fraRegionGroup.regions.map((region) => region.regionCode)
}
