import * as R from 'ramda'

import * as types from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [types.descriptionsFetched]: (state, action) => {
    const data = {[action.name]: R.assoc('fetched', true)(action.data[action.name])}
    return R.merge(state, data)
  },
  [types.descriptionsChangeStart]: (state, action) => {
    const data = {[action.name]: R.pipe(R.assoc('content', action.content), R.dissoc('fetched'))(state[action.name])}
    return R.merge(state, data)
  },
  [types.openEditorStart]: (state, action) => {
    console.log('open reducer', action)
    const newstate = ({...state, 'editing': action.name})
    console.log('reducer state', newstate)
    return newstate
  },
  [types.closeEditorStart]: state => {
    console.log('close reducer')
    return R.omit(['editing'], state)
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
