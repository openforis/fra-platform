import * as R from 'ramda'

export const stateKey = 'landing'

const keys = {
  feed: 'feed',
  overview: 'overview',
  users: 'users',
  countryMessageBoardUnreadMessages: 'countryMessageBoardUnreadMessages',
}

const getState = R.prop(stateKey)

// === READ
export const getFeed = R.pipe(getState, R.propOr(null, keys.feed))
export const getOverviewUsers = R.pipe(getState, R.prop(keys.users))
export const getCountryMessageBoardUnreadMessages = R.pipe(
  getState,
  R.propOr(0, keys.countryMessageBoardUnreadMessages)
)

// === UPDATE
export const assocFeed = R.assoc(keys.feed)
export const assocUsers = R.assoc(keys.users)
export const assocCountryMessageBoardUnreadMessages = R.assoc(keys.countryMessageBoardUnreadMessages)
