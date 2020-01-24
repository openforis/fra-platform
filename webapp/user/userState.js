import * as R from 'ramda'

export const stateKey = 'user'

const keys = {
  i18n: 'i18n'
}

const getState = R.prop(stateKey)

// === READ
export const getI18n = R.pipe(getState, R.propOr(null, keys.i18n))

// === UPDATE
export const assocI18n = R.assoc(keys.i18n)
