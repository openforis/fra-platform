import * as R from 'ramda'

export const stateKey = 'landing'

const keys = {
  feed: 'feed',
  users: 'users',
  countryMessageBoardUnreadMessages: 'countryMessageBoardUnreadMessages',
}

const getState = R.prop(stateKey)

// === READ
export const getFeed = (state: any) => R.pipe(getState, R.propOr(null, keys.feed))(state)
// @ts-ignore
export const getUsers = (state: any) => R.pipe(getState, R.prop(keys.users))(state)
export const getCountryMessageBoardUnreadMessages = (state: any) => R.pipe(
  getState,
  R.propOr(0, keys.countryMessageBoardUnreadMessages)
)(state)

// === UPDATE
export const assocFeed = R.assoc(keys.feed)
export const assocUsers = R.assoc(keys.users)
export const assocCountryMessageBoardUnreadMessages = R.assoc(keys.countryMessageBoardUnreadMessages)
