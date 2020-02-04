import * as R from 'ramda'

export const stateKey = 'landing'

const keys = {
  feed: 'feed',
}

const getState = R.prop(stateKey)

// === READ
export const getFeed = R.pipe(getState, R.propOr(null, keys.feed))

// === UPDATE
export const assocFeed = R.assoc(keys.feed)
