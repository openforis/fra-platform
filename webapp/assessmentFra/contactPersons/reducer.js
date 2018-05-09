import * as R from 'ramda'
import { exportReducer } from './../../utils/reduxUtils'

import { collaboratorsCountryAccessFetch, collaboratorsCountryAccessUpdate } from './actions'

const actionHandlers = {
  [collaboratorsCountryAccessFetch]: (state, action) => ({...state, collaborators: action.collaborators}),

  [collaboratorsCountryAccessUpdate]: (state, action) => {
    const {collaborator} = action
    const idx = R.findIndex(R.propEq('id', collaborator.id), state.collaborators)
    return {...state, collaborators: R.update(idx, collaborator, state.collaborators)}
  }
}

export default exportReducer(actionHandlers)
