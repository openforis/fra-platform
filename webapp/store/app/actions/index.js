export const actions = {
  updateCountries: 'app/update/countries',
  updateRegions: 'app/update/regions',
}

export const updateCountries = (countries) => ({ type: actions.updateCountries, countries })
export const updateRegions = (regions) => ({ type: actions.updateRegions, regions })
