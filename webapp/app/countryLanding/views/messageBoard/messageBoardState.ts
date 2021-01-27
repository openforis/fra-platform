// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
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
