import * as R from 'ramda'

import * as types from './actions'
import { applyReducerFunction } from '@webapp/utils/reduxUtils'

const actionHandlers = {
  [types.descriptionsFetched]: (state, action) => R.assocPath(
    [action.section, action.name],
    action.data[action.name],
    state
  ),
  [types.descriptionsChangeStart]: (state, action) => R.assocPath(
    [action.section, action.name, 'content'],
    action.content,
    state
  ),
  [types.openEditorStart]: (state, action) => ({...state, 'editing': action.name}),
  [types.closeEditorStart]: state => R.omit(['editing'], state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
