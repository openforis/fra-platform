import * as R from 'ramda'
import { exportReducer } from '../utils/reduxUtils'
import { versioningGetSuccess } from './actions'

const actionHandlers = {

  [versioningGetSuccess]: (state, action) => R.pipe(
    R.assocPath(['versions'], action.versions)
  )(state),

}

export default exportReducer(actionHandlers)
