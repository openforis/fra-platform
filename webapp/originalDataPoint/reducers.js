import R from "ramda"
import * as types from "./actions"
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
    [types.dataPointSaveDraftStart]      : ( state, action ) =>
        R.pipe(
            R.assoc( 'status', "saving..." ),
            R.assoc( 'active', action.active )
        )( state ),
    [ types.dataPointSaveDraftCompleted ]: ( state, action ) =>
        R.pipe(
          R.assoc( 'status', null ),
          R.assocPath(['active', 'odpId'], Number(action.odpId))
        )(state),
    [types.odpFetchCompleted]: (state, action) =>
        R.assoc('active', action.active)(state),
    [ types.markAsActualCompleted ]: ( state, action ) => R.assoc( 'active', null, state)
}

export default ( state = {}, action ) => applyReducerFunction( actionHandlers, state, action )