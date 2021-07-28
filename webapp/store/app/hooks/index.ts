import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as AppState from '@webapp/store/app/state'
import { Area, Country } from '@common/country'
import { useI18n } from '@webapp/components/hooks'

import { FRA } from '@core/assessment'
import { sortCountries, sortRegions } from '@webapp/store/app/utils'
import * as AppActions from '../actions'

export function useAssessmentType(): string {
  return useSelector(AppState.getAssessmentType) as string
}

export const useCountries = () => {
  const i18n = useI18n()
  const dispatch = useDispatch()
  const countries = useSelector(AppState.getCountries)
  useEffect(() => {
    dispatch(AppActions.updateCountries(sortCountries(countries, i18n)))
  }, [i18n])
  return countries
}

export const useCountriesPanEuropean = () =>
  (useCountries() as any).filter((country: any) =>
    (Country.getRegionCodes(country) as any[]).includes(Area.levels.forest_europe)
  )
export const useRegions = () => {
  const i18n = useI18n()
  const dispatch = useDispatch()
  const regions = useSelector(AppState.getRegions)
  useEffect(() => {
    dispatch(AppActions.updateRegions(sortRegions(regions, i18n)))
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
  const regionGroups = useSelector(AppState.getRegionGroups)
  const regions = useRegions()
  return (regionGroups as any).map((rg: any) => ({
    ...rg,
    regions: (regions as any).filter((region: any) => region.regionGroup === rg.id),
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
export const useFraRegions = () => {
  const groupedRegions = useGroupedRegions()
  const _fraRegionGroup = groupedRegions.find((groupedRegion) => groupedRegion.name === FRA.type)
  return _fraRegionGroup.regions.map((region) => region.regionCode)
}
