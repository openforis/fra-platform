export const ACTION_TYPE = {
  updateCountries: 'app/update/countries',
  updateRegions: 'app/update/regions',
}

export const updateCountries = (countries) => ({ type: ACTION_TYPE.updateCountries, countries })
export const updateRegions = (regions) => ({ type: ACTION_TYPE.updateRegions, regions })
