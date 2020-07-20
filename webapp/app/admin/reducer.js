import * as R from 'ramda'
import { exportReducer } from '@webapp/utils/reduxUtils'
import {
  versioningGetSuccess,
  versioningPostMissingData,
  versioningPostSuccess,
  versioningPostVersionInvalid,
  versioningUpdateForm
} from './actions'

const actionHandlers = {

  [versioningPostVersionInvalid]: (state, action) => R.pipe(
    R.assocPath(['newVersionForm', 'error'], { error: 'invalidVersion' })
  )(state),

  [versioningPostMissingData]: (state, action) => R.pipe(
    R.assocPath(['newVersionForm', 'error'], { error: 'missingData' })
  )(state),

  [versioningUpdateForm]: (state, action) => R.pipe(
    R.assocPath(['newVersionForm'], { ...state.newVersionForm, ...action.payload }),
    R.dissocPath(['newVersionForm', 'error']),
  )(state),

  [versioningGetSuccess]: (state, action) => R.pipe(
    R.assocPath(['versions'], action.versions)
  )(state),

  [versioningPostSuccess]: (state, action) => R.pipe(
    R.assocPath(['versions'], action.versions),
    R.assocPath(['newVersionForm'], {})
  )(state),

}

export default exportReducer(actionHandlers)
