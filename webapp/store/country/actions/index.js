export const ACTION_TYPE = {
  updateCountries: 'country/countries/update',
}

export const updateCountries = (countries) => ({ type: ACTION_TYPE.updateCountries, countries })
