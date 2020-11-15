import * as R from 'ramda'
import { exportReducer } from '@webapp/utils/reduxUtils'
import * as AdminActions from '@webapp/store/admin/actions'

const actionHandlers = {
  [AdminActions.versioningPostMissingData]: (state) =>
    R.pipe(R.assocPath(['newVersionForm', 'error'], { error: 'missingData' }))(state),

  [AdminActions.versioningUpdateForm]: (state, action) =>
    R.pipe(
      R.assocPath(['newVersionForm'], { ...state.newVersionForm, ...action.payload }),
      R.dissocPath(['newVersionForm', 'error'])
    )(state),

  [AdminActions.versioningGetSuccess]: (state, action) => R.pipe(R.assocPath(['versions'], action.versions))(state),

  [AdminActions.versioningPostSuccess]: (state, action) =>
    R.pipe(R.assocPath(['versions'], action.versions), R.assocPath(['newVersionForm'], {}))(state),
}

export default exportReducer(actionHandlers)
