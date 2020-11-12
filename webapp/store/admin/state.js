import * as R from 'ramda'

export const stateKey = 'admin'

const keys = {
  versions: 'versions',
  newVersionForm: 'newVersionForm'
}

const getState = R.prop(stateKey)

// === READ
export const getVersions = R.pipe(getState, R.propOr([], keys.versions))
export const getNewVersionForm = R.pipe(getState, R.propOr({}, keys.newVersionForm))

// === UPDATE
export const assocVersions = R.assoc(keys.versions)
export const assocNewVersionForm = R.assoc(keys.NewVersionForm)

