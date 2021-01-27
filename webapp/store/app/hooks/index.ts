import { useDispatch, useSelector } from 'react-redux'
import * as AppState from '@webapp/store/app/state'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { Area, Country } from '@common/country'
import { useI18n, useOnUpdate } from '@webapp/components/hooks'
import { sortCountries, sortRegions } from '@webapp/store/app/utils'
import * as AppActions from '../actions'

export const useAssessmentType = () => useSelector(AppState.getAssessmentType)
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
  (useCountries() as any).filter((country: any) => Country.getRegionCodes(country).includes(Area.levels.forest_europe))
export const useRegions = () => {
  const i18n = useI18n()
  const dispatch = useDispatch()
  const regions = useSelector(AppState.getRegions)
  useOnUpdate(() => {
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
