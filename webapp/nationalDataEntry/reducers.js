import * as R from "ramda"

import * as types from "./actions"
import {applyReducerFunction} from '../utils/reduxUtils'

const actionHandlers = {
  [types.valueChangeCompleted]: (state, action) =>
    R.pipe(
      R.assocPath(['reportingYears', action.name, 'value'], action.value),
      R.assoc('status', null),
    )(state),
  [types.valueChangeStart]: (state, action) =>
    R.pipe(
      R.assocPath(['reportingYears', action.name, 'value'], action.value),
      R.assoc('status', "saving...")
    )(state),
  [types.valuesFetched]: (state, action) => action.data
}

export default (state={}, action) => applyReducerFunction(actionHandlers, state, action)
