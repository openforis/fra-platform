// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

export const stateKey = 'admin'

const keys = {
  versions: 'versions',
  newVersionForm: 'newVersionForm',
}

const getState = R.prop(stateKey)

// === READ
export const getVersions = R.pipe(getState, R.propOr([], keys.versions))
export const getNewVersionForm = R.pipe(getState, R.propOr({}, keys.newVersionForm))

// === UPDATE
export const assocVersions = R.assoc(keys.versions)
// @ts-expect-error ts-migrate(2551) FIXME: Property 'NewVersionForm' does not exist on type '... Remove this comment to see the full error message
export const assocNewVersionForm = R.assoc(keys.NewVersionForm)
