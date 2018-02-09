import * as R from 'ramda'

export const getCountry = countryIso => R.pipe(
  R.path(['country', 'countries']),
  R.values,
  R.flatten,
  R.find(R.propEq('countryIso', countryIso)),
)
