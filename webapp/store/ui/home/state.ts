import * as R from 'ramda'

export const stateKey = 'home'

const keys = {
  selectedCountries: 'selectedCountries',
}

const getState = R.propOr({}, stateKey)

// === READ

export const getSelectedCountries = R.pipe(getState, R.propOr([], keys.selectedCountries))

// === UPDATE
export const assocSelectedCountries = R.assoc(keys.selectedCountries)
