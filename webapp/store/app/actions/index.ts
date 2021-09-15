import { Country, Region, RegionGroup } from '@core/country'

import ActionTypes from './actionTypes'

export const updateCountries = (countries: Array<Country>) => ({
  type: ActionTypes.updateCountries,
  countries,
})

export const updateRegions = (regions: Array<Region>) => ({
  type: ActionTypes.updateRegions,
  regions,
})

export const updateRegionGroups = (regionGroups: Array<RegionGroup>) => ({
  type: ActionTypes.updateRegionGroups,
  regionGroups,
})

export { initApp } from './initApp'
export { switchLanguage } from './switchLanguage'
