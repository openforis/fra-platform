import * as R from 'ramda'

export const stateKey = 'ui'

const keys = {
  home: 'home',
  selectedCountries: 'selectedCountries',
}

const getState = R.propOr({}, stateKey)

// === READ

const _getHome = R.pipe(getState, R.propOr({}, keys.home))
export const getSelectedCountries = R.pipe(_getHome, R.propOr([], keys.selectedCountries))

// === UPDATE
export const assocSelectedCountries = R.assocPath([keys.home, keys.selectedCountries])
