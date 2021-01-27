// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

export const stateKey = 'landing'

const keys = {
  feed: 'feed',
  users: 'users',
  countryMessageBoardUnreadMessages: 'countryMessageBoardUnreadMessages',
}

const getState = R.prop(stateKey)

// === READ
export const getFeed = R.pipe(getState, R.propOr(null, keys.feed))
export const getUsers = R.pipe(getState, R.prop(keys.users))
export const getCountryMessageBoardUnreadMessages = R.pipe(
  getState,
  R.propOr(0, keys.countryMessageBoardUnreadMessages)
)

// === UPDATE
export const assocFeed = R.assoc(keys.feed)
export const assocUsers = R.assoc(keys.users)
export const assocCountryMessageBoardUnreadMessages = R.assoc(keys.countryMessageBoardUnreadMessages)
