import * as R from 'ramda'

export const stateKey = 'countryMessageBoard'

const keys = {
  countryMessageBoard: 'countryMessageBoard',
  show: 'show',
}

const getState = R.prop(stateKey)

// === READ
export const getCountryMessageBoard = R.pipe(getState, R.prop(keys.countryMessageBoard))
export const getCountryMessageBoardOpened = R.pipe(getCountryMessageBoard, R.propOr(false, keys.show))
