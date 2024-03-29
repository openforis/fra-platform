import { useEffect } from 'react'

import { AssessmentType, FRA } from '@core/assessment'
import { Areas, Country, Region, RegionCode } from '@core/country'

import { useI18n } from '@webapp/hooks'

import { useAppDispatch, useAppSelector } from '@webapp/store'
import { Objects } from '@core/utils'
import { AppActions } from '../appSlice'

export const usePrintView = (): boolean[] =>
  useAppSelector((state) => [!Objects.isEmpty(state.app?.printView), state.app?.printView?.onlyTables])

export const useAppLoaded = (): boolean => useAppSelector((state) => state.app.loaded)

export const useAssessmentType = (): AssessmentType | null =>
  useAppSelector((state) => state.app.assessmentType ?? null)

export const useCountries = (): Array<Country> => {
  const i18n = useI18n()

  const dispatch = useAppDispatch()
  const countries = useAppSelector((state) => state.app?.countries ?? [])

  useEffect(() => {
    dispatch(AppActions.updateCountries(Areas.sortCountries(countries, i18n)))
  }, [i18n.language])

  return countries
}

export const useCountriesPanEuropean = (): Array<Country> =>
  useCountries().filter((country) => country.regionCodes.includes(RegionCode.FE))

export const useRegions = (): Array<Region> => {
  const dispatch = useAppDispatch()
  const i18n = useI18n()

  const regions = useAppSelector((state) => state.app?.regions ?? [])

  useEffect(() => {
    dispatch(AppActions.updateRegions(Areas.sortRegions(regions, i18n)))
  }, [i18n.language])

  return regions
}
/**
 {
    "id": 1,
    "name": "fra",
    "order": 0
  },
 */
export const useGroupedRegions = () => {
  const regionGroups = useAppSelector((state) => state.app?.regionGroups ?? [])
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
  return (_fraRegionGroup?.regions ?? []).map((region) => region.regionCode)
}

export { default as useCountryIso } from './useCountryIso'
