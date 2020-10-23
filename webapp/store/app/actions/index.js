export const ACTION_TYPE = {
  updateCountries: 'app/countries/update',
  updateRegions: 'app/regions/update',
}

export const updateCountries = (countries) => ({ type: ACTION_TYPE.updateCountries, countries })
export const updateRegions = (regions) => ({ type: ACTION_TYPE.updateRegions, regions })
