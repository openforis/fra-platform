import { exportReducer } from './../../utils/reduxUtils'

import { collaboratorsFetch } from './actions'

const actionHandlers = {
  [collaboratorsFetch]: (state, action) => ({...state, collaborators: action.collaborators})
}

export default exportReducer(actionHandlers)
