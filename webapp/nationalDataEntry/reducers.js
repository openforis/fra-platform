import * as R from "ramda"

import * as types from "./actions"
import {applyReducerFunction} from '../utils/reduxUtils'

const updateValue = (state, action) => {
        const idx = R.findIndex(R.propEq('name', action.name), state.fra)
        const newState = R.clone(state)
        newState.fra[idx] = R.assoc("forestArea", Number(action.value))(newState.fra[idx])
        return newState
      }

const actionHandlers = {
  [types.valueChangeCompleted]: (state, action) =>
    R.pipe(
      R.partialRight(updateValue, [action]),
      R.assoc('status', null),
    )(state),
  [types.valueChangeStart]: (state, action) =>
    R.pipe(
      R.partialRight(updateValue, [action]),
      R.assoc('status', "saving..."),
    )(state),
  [types.valuesFetched]: (state, action) => action.data,
  [types.generateFraValuesStart] :(state,action) => R.assoc('generatingFraValues', true)(state)
}

export default (state={}, action) => applyReducerFunction(actionHandlers, state, action)
