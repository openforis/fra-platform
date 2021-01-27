import * as R from 'ramda'

export const stateKey = 'countryMessageBoard'

const keys = {
  countryMessageBoard: 'countryMessageBoard',
  show: 'show',
}

const getState = R.prop(stateKey)

// === READ
// @ts-ignore
export const getCountryMessageBoard = (state: any) => R.pipe(getState, R.prop(keys.countryMessageBoard))(state)
// @ts-ignore
export const getCountryMessageBoardOpened = (state: any) => R.pipe(getCountryMessageBoard, R.propOr(false, keys.show))(state)
